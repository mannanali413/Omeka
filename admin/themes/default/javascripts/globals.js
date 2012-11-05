if (!Omeka) {
    var Omeka = {};
}

/**
 * Add the TinyMCE WYSIWYG editor to a page.
 * Default is to add to all textareas.
 *
 * @param {Object} [params] Parameters to pass to TinyMCE, these override the
 * defaults.
 */
Omeka.wysiwyg = function (params) {
    // Default parameters
    initParams = {
        convert_urls: false,
        mode: "textareas", // All textareas
        theme: "advanced",
        theme_advanced_toolbar_location: "top",
        theme_advanced_toolbar_align: "left",
        theme_advanced_buttons1: "bold,italic,underline,|,justifyleft,justifycenter,justifyright,|,bullist,numlist,|,link,formatselect,code",
        theme_advanced_buttons2: "",
        theme_advanced_buttons3: "",
        plugins: "paste,inlinepopups,media",
        media_strict: false,
        width: "100%"
    };

    // Overwrite default params with user-passed ones.
    for (var attribute in params) {
        // Account for annoying scripts that mess with prototypes.
        if (params.hasOwnProperty(attribute)) {
            initParams[attribute] = params[attribute];
        }
    }

    tinyMCE.init(initParams);
};

Omeka.deleteConfirm = function () {
    jQuery('.delete-confirm').click(function (event) {
        var url;

        event.preventDefault();
        if (jQuery(this).is('input')) {
            url = jQuery(this).parents('form').attr('action');
        } else if (jQuery(this).is('a')) {
            url = jQuery(this).attr('href');
        } else {
            return;
        }

        jQuery.post(url, function (response){
            jQuery(response).dialog({modal:true});
        });
    });
};

Omeka.saveScroll = function () {
    var $save   = jQuery("#save"),
        $window = jQuery(window),
        offset  = $save.offset(),
        topPadding = 62,
        $contentDiv = jQuery("#content");
    if (document.getElementById("save")) {
        $window.scroll(function () {
            if($window.scrollTop() > offset.top && $window.width() > 767 && ($window.height() - topPadding - 85) >  $save.height()) {
                $save.stop().animate({
                    marginTop: $window.scrollTop() - offset.top + topPadding
                    });
            } else {
                $save.stop().animate({
                    marginTop: 0
                });
            }
        });
    }
};

Omeka.showAdvancedForm = function () {
    var advancedForm = jQuery('#advanced-form');
    if (advancedForm) {
        jQuery('#search-form input[type=submit]').addClass("blue button with-advanced").after('<a href="#" id="advanced-search" class="blue button">Advanced Search</a>');
        advancedForm.click(function (event) {
            event.stopPropagation();
        });
        jQuery("#advanced-search").click(function (event) {
            event.preventDefault();
            event.stopPropagation();
            advancedForm.fadeToggle();
            jQuery(document).click(function (event) {
                if (event.target.id == 'query') {
                    return;
                }
                advancedForm.fadeOut();
                jQuery(this).unbind(event);
            });
        });
    } else {
        jQuery('#search-form input[type=submit]').addClass("blue button");
    }
};

Omeka.addReadyCallback = function (callback, params) {
    this.readyCallbacks.push([callback, params]);
};

Omeka.runReadyCallbacks = function () {
    for (var i = 0; i < this.readyCallbacks.length; ++i) {
        var params = this.readyCallbacks[i][1] || [];
        this.readyCallbacks[i][0].apply(this, params);
    }
};

Omeka.readyCallbacks = [
    [Omeka.deleteConfirm, null],
    [Omeka.saveScroll, null],
    [Omeka.showAdvancedForm, null]
];
