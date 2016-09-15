import React from 'react';

const twitterWindow = () => {
  const baseUrl = `https://twitter.com/intent/tweet?text=${window.location.href}`;
  const windowOptions = 'scrollbars=yes,resizable=yes,toolbar=no,location=yes';
  const width = 550;
  const height = 420;
  const winHeight = screen.height;
  const winWidth = screen.width;
  const left = Math.round((winWidth / 2) - (width / 2));
  let top = 0;
  if (winHeight > height) {
    top = Math.round((winHeight / 2) - (height / 2));
  }
  window.open(baseUrl, 'intent', windowOptions + ',width=' + width +
    ',height=' + height + ',left=' + left + ',top=' + top);
};

const Tweet = () => {
  return (
    <button type="button" onClick={() => twitterWindow()} className="btn btn-info" aria-label="Left Align">
      <span className="fa fa-twitter" aria-hidden="true" />
      &nbsp;Tweet
    </button>
  );
};

export default Tweet;
