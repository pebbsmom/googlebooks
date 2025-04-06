export const getSavedBookIds = () => {
  const savedBooks = localStorage.getItem('saved_books');
  const savedBookIds = savedBooks ? JSON.parse(savedBooks) : [];

  return savedBookIds;
};

export const saveBookIds = (bookIdArr: string[]) => {
  if (bookIdArr.length) {
    localStorage.setItem('saved_books', JSON.stringify(bookIdArr));
  } else {
    localStorage.removeItem('saved_books');
  }
};

export const removeBookId = (bookId: string) => {
  const savedBooks = localStorage.getItem('saved_books');
  const savedBookIds = savedBooks ? JSON.parse(savedBooks) : null;
  if (!savedBookIds) {
    return false;
  }

  const updatedSavedBookIds = savedBookIds?.filter((savedBookId: string) => savedBookId !== bookId);
  localStorage.setItem('saved_books', JSON.stringify(updatedSavedBookIds));

  return true;
};
