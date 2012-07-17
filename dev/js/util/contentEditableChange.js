define(['jquery'], function ($) {
  return $(function () {
    $(document).delegate('[contenteditable]', 'focus', function () {
      var $this = $(this);
      $this.data('before', $this.html());
      return $this;
    }).delegate('[contenteditable]', 'blur keyup paste', function () {
      var $this = $(this);
      if ($this.data('before') !== $this.html()) {
        $this.data('before', $this.html());
        $this.trigger('change');
      }
      return $this;
    });
  });
});
