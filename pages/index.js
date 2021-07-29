import BlogCard from "../components/BlogCard";
import Layout from "../components/Layout";

function Home({ posts }) {
  return (
    <Layout title="Simple Post Application">
      <div className="row my-5">
        {posts.map((post) => (
          <BlogCard post={post} key={post._id} />
        ))}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const response = await fetch("http://localhost:3000/api/posts");
  const data = await response.json();
  return {
    props: {
      posts: data,
    },
    revalidate: 60,
  };
}

export default Home;
