import { FC, useEffect, useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { MdOutlineOndemandVideo } from "react-icons/md";

type Props = {
  data?: any[];
  activeVideo?: number;
  setActiveVideo?: any;
  isDemo?: boolean;
};

const CourseContentList: FC<Props> = (props: Props) => {
  //const courseData = props?.data || [];
  const [courseData, setCourseData] = useState<any[]>([]); // Initialize as empty array

  useEffect(() => {
    // Update courseData when props.data changes
    if (props.data) {
      setCourseData(props.data);
    }
  }, [props.data]); // Run effect whenever props.data changes

  console.log("Props.data:", props.data);
  console.log("CourseData:", courseData);

  if (!courseData || !Array.isArray(courseData)) {
    // If courseData is not defined or not an array, render an error message
    return <div>Error: Course data is not available.</div>;
  }
  const [visibleSections, setVisibleSections] = useState<Set<string>>(
    new Set<string>()
  );

  // const videoSections: string[] = [
  //   ...new Set<string>(courseData?.map((item: any) => item.videoSection)),
  // ];
  const videoSections: string[] = Array.from(
    new Set(courseData.map((item: any) => item.videoSection))
  );
  let totalCount: number = 0;
  const toggleSection = (section: string) => {
    const newVisibleSections = new Set(visibleSections);
    if (newVisibleSections.has(section)) {
      newVisibleSections.delete(section);
    } else {
      newVisibleSections.add(section);
    }
    setVisibleSections(newVisibleSections);
  };
  return (
    <div
      className={`mt-[15px] w-full ${
        props.isDemo && "ml-[-30px] sticky top-24 left-0 z-30"
      }`}
    >
      {videoSections.map((section: string, sectionIndex: number) => {
        const isSectionVisible = visibleSections.has(section);
        const sectionVideos: any[] = courseData.filter(
          (item: any) => item.videoSection === section
        );
        const sectionVideoCount: number = sectionVideos.length;
        const sectionVideoLength: number = sectionVideos.reduce(
          (totalLength: number, item: any) => totalLength + item.videoLength,
          0
        );

        const sectionStartIndex: number = totalCount;
        totalCount += sectionVideoCount;
        // const sectionContentHours: number = sectionVideoLength / 60;
        // const sectionContentMinutes: number = sectionVideoLength % 60;
        return (
          <div
            className={`${
              props.isDemo && "border-b border-[#ffffff8e] pb-2"
            } shadow-md`}
            key={section}
          >
            <div className="w-full flex">
              <div className="pl-8 w-full flex justify-between items-center mt-5">
                <h2 className="text-[22px] text-black">{section}</h2>
                <button
                  className="mr-4 cursor-pointer text-black"
                  onClick={() => toggleSection(section)}
                >
                  {isSectionVisible ? (
                    <BsChevronUp size={20} />
                  ) : (
                    <BsChevronDown size={20} />
                  )}
                </button>
              </div>
            </div>
            <h5 className="text-black pl-10">
              {sectionVideoCount} Lessons{" "}
              {/* {sectionVideoLength < 60
                ? sectionVideoLength
                : sectionContentHours.toFixed(2)}
              {""}
              {sectionVideoLength > 60 ? "Hours" : "Minutes"} */}
            </h5>
            <br />
            {isSectionVisible && (
              <div className="w-full pl-5">
                {sectionVideos.map((item: any, index: number) => {
                  const videoIndex: number = sectionStartIndex + index;
                  //const contentLength = item.videoLength / 60;
                  return (
                    <div
                      className={`w-full ${
                        videoIndex === props.activeVideo ? "bg-slate-300" : ""
                      } cursor-pointer transition-all p-2`}
                      key={item._id}
                      onClick={() =>
                        props.isDemo ? null : props?.setActiveVideo(videoIndex)
                      }
                    >
                      <div className="flex items-center">
                        <div>
                          <MdOutlineOndemandVideo
                            size={20}
                            className="mr-2"
                            color="#1cdada"
                          />
                        </div>
                        <h1 className="text-[18px] inline-block break-words">
                          {item.title}
                        </h1>
                      </div>
                      {/* <h5 className="pl-8 text-black">
                        {item.videoLength > 60
                          ? contentLength.toFixed(2)
                          : item.videoLength}{" "}
                        {item.videoLength > 60 ? "hours" : "minutes"}
                      </h5> */}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CourseContentList;
