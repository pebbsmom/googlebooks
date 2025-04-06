import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';

import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';

import { GET_ME } from '../utils/queries';
import { REMOVE_BOOK } from '../utils/mutations';

// Interfaces moved outside component
interface SavedBook {
  bookId: string;
  title: string;
  authors: string[];
  description: string;
  image?: string;
}

interface UserData {
  username: string;
  books: SavedBook[];
}

const SavedBooks = () => {
  const { loading, data } = useQuery(GET_ME);
  const [removeBook] = useMutation(REMOVE_BOOK, {
    refetchQueries: [{ query: GET_ME }],
  });

  const userData: UserData | null = data?.me || null;

  const handleDeleteBook = async (bookId: string) => {
    if (!Auth.loggedIn()) {
      return false;
    }

    try {
        await removeBook({
          variables: { bookId },
        });
  
        removeBookId(bookId);
      } catch (err) {
        console.error(err);
    }
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  if (!userData) {
    return <h2>No user data available!</h2>;
  }

  return (
    <>
      <div className='text-light bg-dark p-5'>
        <h1>Viewing {userData.username}'s saved books!</h1>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.books?.length
            ? `Viewing ${userData.books.length} saved ${
                userData.books.length === 1 ? 'book' : 'books'
              }:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {userData.books?.map((book: SavedBook) => (
            <Col md='4' key={book.bookId}>
              <Card border='dark'>
                {book.image && (
                  <Card.Img
                    src={book.image}
                    alt={`The cover for ${book.title}`}
                    variant='top'
                  />
                )}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors.join(', ')}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button
                    className='btn-block btn-danger'
                    onClick={() => handleDeleteBook(book.bookId)}
                  >
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;

