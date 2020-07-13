(function ($) {
    $(document).ready(function () {
        var _forms = $('.contact-form');
        _forms.each(function (i, _form) {
            //element init
            var _form_obj = $($(_form).find('form'));
            var _submit_status_wrapper = _form_obj.find('.submit-status-wrapper');
            var _ajax_data = $(_form_obj.find('.form-ajax-data'));

            //ajax data
            var _is_ajax = _ajax_data.attr('data-is-ajax');
            var _form_id = _ajax_data.attr('data-form-id');
            var _loader_url = _ajax_data.attr('data-loader-url');
            var _ajax_url = _ajax_data.attr('data-ajax-url');
            var _error_msg = _ajax_data.attr('data-error-msg');

            //data var init
            var _submit_response = {status: false, msg: false};
            var _gated_post_id = 0;

            _form_obj.validate();

            if (_is_ajax) {
                _form_obj.submit(function (e) {
                    if (_form_obj.valid()) {
                        e.preventDefault();
                        //get post id when gated enabled
                        if ($(this).parents('[data-post-id]').length > 0) {
                            _gated_post_id = $(this).parents('[data-post-id]').attr('data-post-id')
                        }

                        _submit_status_wrapper.html('<img src="' + _loader_url + '"/>'
                        )
                        ;
                        _submit_status_wrapper.hide();

                        var _formData = new FormData(this);
                        if ($(this).parents('[data-post-id]').length > 0) {
                            _formData.append('gated_post', _gated_post_id);
                        }
                        $.ajax({
                            url: _form_obj.attr('action'),
                            type: "POST",
                            data: _formData,
                            contentType: false,
                            cache: false,
                            processData: false,
                            beforeSend: function () {

                            },
                            success: function (data) {
                                if (data.success) {
                                    //submit response from server @status and @status message
                                    var _submit_response = data.data.save_data;
                                    //console.log(_submit_response);

                                    //if form submitted successfully
                                    if (_submit_response.status) {
                                        $(_form_obj)[0].reset();
                                        // console.log('himss Khan');
                                        //reset recaptcha
                                       // grecaptcha.reset();
                                        $(".file-upload-wrapper").attr("data-text", '');
                                        //success actions
                                        switch (_submit_response.success_action) {
                                            case "redirect" :
                                                window.location.href = _submit_response.success_target;
                                                break;
                                            case "popup" :
                                                break;
                                            case "file" :
                                                $.AjaxDownloader({
                                                    url: _ajax_url,
                                                    data: {
                                                        action: 'download_file',
                                                        fileurl: _submit_response.success_target,
                                                    }
                                                });
                                                break;
                                        }
                                    }
                                    _submit_status_wrapper.html("<span class='submit-" + _submit_response.status + "'>" + _submit_response.msg + "</span>");
                                } else {
                                    _submit_status_wrapper.html("<span class='submit-false'>" + _error_msg + "</span>");
                                }
                                $(_form_obj).find("button").prop('disabled', false);
                            },
                            error: function (e) {
                                _submit_status_wrapper.html("<span class='submit-false'>" + _error_msg + "</span>");
                                $(_form_obj).find("button").prop('disabled', false);
                            }
                        });

                        _submit_status_wrapper.show();
                        $(_form_obj).find("button").prop('disabled', true);

                    } else {
                        _submit_status_wrapper.html('<img src="' + _loader_url + '"/>'
                        )
                        ;
                        _submit_status_wrapper.hide();
                    }
                });
            }
        });
    });
})(jQuery);