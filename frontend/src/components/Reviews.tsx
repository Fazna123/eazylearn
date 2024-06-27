import ReviewCard from "./ReviewCard";

const sampleReviews = [
  {
    name: "John Doe",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    profession: "Software Engineer",
    comment:
      "Excellent course content and very informative. Highly recommended!",
  },
  {
    name: "Alice Smith",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    profession: "Graphic Designer",
    comment:
      "The instructors were very knowledgeable and engaging. Enjoyed every bit of it!",
  },
  {
    name: "Bob Johnson",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    profession: "Marketing Manager",
    comment:
      "Great platform for learning new skills. Will definitely come back for more courses!",
  },
  {
    name: "Emily Brown",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    profession: "Teacher",
    comment:
      "Easy to follow lectures and well-structured course material. 5 stars!",
  },
];

const Reviews = () => {
  return (
    <div className=" bg-blue-50 m-0 p-10">
      <br />
      <br />
      <hr className="mt-8 mb-8 border-gray-400" />
      <br />
      <br />
      <div className="w-full items-center">
        <h3 className="text-[30px] text-slate-800 text-center font-[700]">
          Reviews
        </h3>
      </div>
      <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[35px] pt-10 pb-12 border-0">
        {sampleReviews.map((item: any, index: number) => (
          <ReviewCard item={item} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Reviews;
