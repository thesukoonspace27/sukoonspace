import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import  {useToast}  from "@/components/ui/use-toast";
import { CheckIcon, DollarSignIcon } from "lucide-react";
import { courses } from "../AllCourses";





export default function CourseDetails() {
  const { courseId } = useParams();
  const course = courses[courseId];
  const { toast } = useToast();

  const loadRazorpay = (price, name) => {
    const options = {
      key: "YOUR_RAZORPAY_KEY_ID",
      amount: price * 100,
      currency: "INR",
      name: name,
      description: "Yoga Course Payment",
      handler: function (response) {
        toast({
          title: "Payment Successful!",
          description: `Payment ID: ${response.razorpay_payment_id}`,
          duration: 5000,
        });
      },
      theme: {
        color: "#9b87f5",
      },
    };

    const rzp = new (window).Razorpay(options);
    rzp.open();
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  if (!course)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-6 text-center">
          <p className="text-red-600">Course not found!</p>
        </Card>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F2FCE2] via-[#E5DEFF] to-[#D6BCFA] p-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Image */}
          <div className="animate-fade-in">
            <img
              src={course.image}
              alt={course.name}
              className="rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] w-full object-cover aspect-[4/3]"
            />
          </div>

          {/* Right Column - Content */}
          <div className="space-y-8">
            <div className="animate-fade-in [animation-delay:200ms]">
              <h1 className="font-playfair text-5xl font-bold text-gray-900 mb-4">
                {course.name}
              </h1>
              <p className="text-lg text-gray-600 font-medium">
                By {course.instructor}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 animate-fade-in [animation-delay:400ms]">
              <Card className="p-4 bg-white/80 backdrop-blur-sm">
                <p className="text-sm text-gray-500">Duration</p>
                <p className="font-semibold">{course.duration}</p>
              </Card>
              <Card className="p-4 bg-white/80 backdrop-blur-sm">
                <p className="text-sm text-gray-500">Class Time</p>
                <p className="font-semibold">{course.classTime}</p>
              </Card>
            </div>

            <div className="flex flex-wrap gap-2 animate-fade-in [animation-delay:600ms]">
              {course.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-white/80 backdrop-blur-sm text-purple-700 px-4 py-1.5 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="animate-fade-in [animation-delay:800ms]">
              <p className="text-lg leading-relaxed text-gray-700">
                {course.description}
              </p>
            </div>

            <Card className="p-6 bg-white/90 backdrop-blur-sm animate-fade-in [animation-delay:1000ms]">
              <div className="flex items-center justify-between mb-6">
                <p className="text-2xl font-playfair font-bold text-gray-900">
                  Course Fee
                </p>
                <p className="text-3xl font-bold text-purple-700">
                  ₹{course.price}
                </p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2">
                  <CheckIcon className="text-green-500 h-5 w-5" />
                  <span>Lifetime access to course materials</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckIcon className="text-green-500 h-5 w-5" />
                  <span>Personal guidance from expert instructors</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckIcon className="text-green-500 h-5 w-5" />
                  <span>Certificate of completion</span>
                </div>
              </div>

              <Button
                className="w-full bg-[#9b87f5] hover:bg-[#7E69AB] text-white font-medium py-6 text-lg shadow-lg shadow-purple-200 transition-all hover:scale-[1.02]"
                onClick={() => loadRazorpay(course.price, course.name)}
              >
                <DollarSignIcon className="mr-2 h-5 w-5" />
                Enroll Now
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
