// Toggle edit review form
$('.toggle-edit-form').on('click', function() {
    $(this).text() === 'Edit' ? $(this).text('cancel') : $(this).text('Edit');
    $(this).siblings('.edit-review-form').toggle();
});