jQuery.ajax({
    url: "https://mirantis.jira.com/s/4ed53ccf16578ed4b1d4b6b7efa13491-T/en_USltmd6x/65007/316/1.4.25/_/download/batch/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector-embededjs/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector-embededjs.js?locale=en-US&collectorId=23810080",
    type: "get",
    cache: true,
    dataType: "script"
});

// Toggle main sections
$(".docs-sidebar-section-title").click(function () {
    $('.docs-sidebar-section').not(this).closest('.docs-sidebar-section').removeClass('active');
    $(this).closest('.docs-sidebar-section').toggleClass('active');
});

// webui popover
$(document).ready(function() {
    function checkWidth() {
        var windowSize = $(window).width();

        if (windowSize <= 767) {
            $('.gloss').webuiPopover({placement:'auto',trigger:'click'});
        }
        else if (windowSize >= 768) {
            $('.gloss').webuiPopover({placement:'auto',trigger:'hover'});
        }
    }

    // Execute on load
    checkWidth();
    // Bind event listener
    $(window).resize(checkWidth);
});

// Bootstrap stuff
$('.docs-actions i').tooltip();
$('.docs-sidebar-home').tooltip();

// Hide/Toggle definitions
$("#toggle-definitions").click(function () {
  $(this).toggleClass('docs-info-off');
  if ($('.gloss').hasClass('on')) {
      $('.gloss').removeClass('on').addClass('off').webuiPopover('destroy');
  } else if ($('.gloss').hasClass('off')) {
      $('.gloss').removeClass('off').addClass('on').webuiPopover();
  }
});

/* BB 150310
   We also insert a space between the icon and the admonition title
   ("Note", "Warning", "Important" or their i18n equivalents).

   This could be done with a single clause $('p.admonition-title')....,
   affecting all types of admonitions. I play it safe here and explicitly
   work on the three openstackdocstheme admonitions.

   The first parameter of the text() callback is not needed here (it's
   the index of the HTML element that we are modifying)                 */

$('div.important > p.admonition-title').text(function(ignored_para,original) {
    return " "+original
});
$('div.note > p.admonition-title').text(function(ignored_para,original) {
    return " "+original
});
$('div.warning > p.admonition-title').text(function(ignored_para,original) {
    return " "+original
});
