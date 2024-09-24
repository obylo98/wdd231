document.addEventListener("DOMContentLoaded", function () {
  const currentYear = new Date().getFullYear();
  const lastModified = document.lastModified;

  const currentYearElement = document.getElementById("currentYear");
  const lastModifiedElement = document.getElementById("lastModified");

  if (currentYearElement) {
    currentYearElement.textContent = currentYear;
  } else {
    console.warn('Element with ID "currentYear" not found.');
  }

  if (lastModifiedElement) {
    lastModifiedElement.textContent = lastModified;
  } else {
    console.warn('Element with ID "lastModified" not found.');
  }

  const menuToggle = document.querySelector(".menu-toggle");
  const navbar = document.getElementById("navbar");

  if (menuToggle && navbar) {
    menuToggle.addEventListener("click", () => {
      const navUl = navbar.querySelector("ul");
      if (navUl) {
        navUl.classList.toggle("show");
      } else {
        console.warn("No <ul> found inside the navbar.");
      }
    });
  } else {
    console.warn("Menu toggle or navbar not found.");
  }

  const allBtn = document.getElementById("filter-all");
  const cseBtn = document.getElementById("filter-cse");
  const wddBtn = document.getElementById("filter-wdd");
  const courses = document.querySelectorAll(".course");

  if (allBtn) allBtn.addEventListener("click", () => filterCourses("all"));
  if (cseBtn) cseBtn.addEventListener("click", () => filterCourses("cse"));
  if (wddBtn) wddBtn.addEventListener("click", () => filterCourses("wdd"));

  function filterCourses(type) {
    courses.forEach((course) => {
      if (type === "all" || course.classList.contains(type)) {
        course.style.display = "block";
      } else {
        course.style.display = "none";
      }
    });
  }

  const coursesData = [
    {
      subject: "CSE",
      number: 110,
      title: "Introduction to Programming",
      credits: 2,
      certificate: "Web and Computer Programming",
      description:
        "This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.",
      technology: ["Python"],
      completed: false,
    },
    {
      subject: "WDD",
      number: 130,
      title: "Web Fundamentals",
      credits: 2,
      certificate: "Web and Computer Programming",
      description:
        "This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.",
      technology: ["HTML", "CSS"],
      completed: false,
    },
    {
      subject: "CSE",
      number: 111,
      title: "Programming with Functions",
      credits: 2,
      certificate: "Web and Computer Programming",
      description:
        "CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.",
      technology: ["Python"],
      completed: false,
    },
    {
      subject: "CSE",
      number: 210,
      title: "Programming with Classes",
      credits: 2,
      certificate: "Web and Computer Programming",
      description:
        "This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.",
      technology: ["C#"],
      completed: false,
    },
    {
      subject: "WDD",
      number: 131,
      title: "Dynamic Web Fundamentals",
      credits: 2,
      certificate: "Web and Computer Programming",
      description:
        "This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.",
      technology: ["HTML", "CSS", "JavaScript"],
      completed: false,
    },
    {
      subject: "WDD",
      number: 231,
      title: "Frontend Web Development I",
      credits: 2,
      certificate: "Web and Computer Programming",
      description:
        "This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.",
      technology: ["HTML", "CSS", "JavaScript"],
      completed: false,
    },
  ];
});
