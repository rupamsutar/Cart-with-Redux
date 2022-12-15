import ProductItem from './ProductItem';
import classes from './Products.module.css';

const Products = (props) => {
  const DUMMY_DATA = [
    {
      id: 1,
      price: 100,
      title: "Do Epic Shit",
      description: "Author: Ankur Warikoo"
    },
    {
      id: 2,
      price: 200,
      title: "Deep Work",
      description: "Author: Cal Newport"
    }
  ]
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_DATA.map((book) => (
          <ProductItem
            key={book.id}
            id={book.id}
            title= {book.title}
            price={book.price}
            description={book.description} 
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
