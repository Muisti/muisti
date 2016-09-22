// Export Constants
export const TOGGLE_ADD_POST = 'TOGGLE_ADD_POST';
export const SHOW_ADD_POST = 'SHOW_ADD_POST';

// Export Actions
export function toggleAddPost() {
  return {
    type: TOGGLE_ADD_POST,
  };
}

export function showAddPost() {
  return {
    type: SHOW_ADD_POST,
  };
}
