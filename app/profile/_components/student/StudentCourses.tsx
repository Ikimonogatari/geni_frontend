import React from "react";
import { useGetStudentCoursesQuery } from "@/app/services/service";

function StudentCourses() {
  const {
    data: studentCoursesData,
    error: studentCoursesError,
    isLoading: studentCoursesLoading,
  } = useGetStudentCoursesQuery({});

  if (studentCoursesLoading) {
    return <div className="mt-8">Loading courses...</div>;
  }

  if (studentCoursesError || !studentCoursesData?.courses?.length) {
    return null;
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">Миний хичээлүүд</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {studentCoursesData.courses.map((course, index) => (
          <div
            key={index}
            className="border border-[#CDCDCD] rounded-xl p-4 flex flex-col"
          >
            <div className="font-bold text-lg mb-2">{course.title}</div>
            <div className="text-[#6F6F6F] mb-4">{course.description}</div>
            {course.progress && (
              <div className="mt-auto">
                <div className="text-sm text-[#6F6F6F] mb-1">
                  Үзсэн хэмжээ: {course.progress}%
                </div>
                <div className="w-full bg-[#F5F4F0] rounded-full h-2">
                  <div
                    className="bg-geni-green h-2 rounded-full"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentCourses;
