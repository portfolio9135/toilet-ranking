// app/post/[postId]/page.tsx
import PostDetailPage from './_PostDetailPage';

const Page = ({ params }: { params: { id: string } }) => {
  return <PostDetailPage params={params} />;
};

export default Page;
