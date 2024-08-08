/**
 * Utility function to delay hiding the spinner.
 * @param {Function} callback - Function to be executed after the delay.
 * @param {number} [delay=500] - Delay duration in milliseconds.
 */
export const delayHideSpinner = (callback, delay = 500) => {
    setTimeout(callback, delay);
  };