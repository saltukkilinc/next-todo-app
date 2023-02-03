// import Meta from '../../../components/Meta';

import Link from 'next/link';
import Head from 'next/head';

const todo = ({todo}) => {

  return (
    <>
      <Head>
        <title>{todo.title}</title>
      </Head>
      <h3>{todo.title}</h3>
      <p>{todo.body}</p>
      <Link href='/'>Back </Link>
    </>
  )
}

export default todo;

export const getStaticProps = async (context) => {
  const res = await fetch(`http://localhost:3000/api/todos/${context.params.id}`);
  const todo = await res.json();

  return {
    props: {
      todo,
    }
  }
}

export const getStaticPaths = async () => {
  const res = await fetch(`http://localhost:3000/api/todos`)
  const todos = await res.json();

  // take ids from list to new id list
  const ids = todos.map(todo => todo.id);
  // change format
  const paths = ids.map(id => ({params: {id: id.toString()}}))

  return {
    // paths: {params : {id: '1', id: '2'}}
    paths,
    fallback: false,
  }
}