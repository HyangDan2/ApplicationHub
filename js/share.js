// HD2Lab hub share control: one floating link button in the bottom-right
// corner. The light/dark switch now lives in the header, so the corner is for
// sharing the page: the Web Share API where it exists (a cancelled sheet is
// not an error), otherwise copy the URL and confirm with a toast.
(() => {
  const button = document.getElementById('share-toggle');
  const toast = document.getElementById('share-toast');
  if (!button) return;

  const korean = (document.documentElement.lang || '').toLowerCase().startsWith('ko');
  const copiedMessage = korean ? '링크가 복사되었어요' : 'Link copied';
  let hideTimer = 0;

  const showToast = message => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('is-visible');
    window.clearTimeout(hideTimer);
    hideTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 2200);
  };

  const legacyCopy = value => {
    try {
      const field = document.createElement('textarea');
      field.value = value;
      field.setAttribute('readonly', '');
      field.style.position = 'fixed';
      field.style.top = '-1000px';
      field.style.opacity = '0';
      document.body.appendChild(field);
      field.select();
      const copied = document.execCommand('copy');
      field.remove();
      return copied;
    } catch {
      return false;
    }
  };

  const copyUrl = url => {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(url).then(
        () => true,
        () => legacyCopy(url),
      );
    }
    return Promise.resolve(legacyCopy(url));
  };

  button.addEventListener('click', () => {
    const url = window.location.href;

    if (navigator.share) {
      navigator.share({ title: document.title, url }).catch(error => {
        if (error && error.name === 'AbortError') return;
        copyUrl(url).then(copied => {
          if (copied) showToast(copiedMessage);
        });
      });
      return;
    }

    copyUrl(url).then(copied => {
      if (copied) showToast(copiedMessage);
    });
  });
})();
