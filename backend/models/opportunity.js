import moongoose from "mongoose";
const opportunitySchema = new moongoose.Schema({
      id: 1,
      title: "Software Development Intern",
      company: "TechCorp Solutions",
      location: "Nairobi, Kenya",
      duration: "3 months",
      type: "Internship",
      posted: "2 days ago",
      skills: ["React", "JavaScript", "Python"],
      description: "Join our engineering team to build scalable web applications using modern technologies."
    },
     {
      id: 2,
      title: "Marketing Assistant",
      company: "Creative Agency Ltd",
      location: "Mombasa, Kenya",
      duration: "6 months",
      type: "Attachment",
      posted: "1 week ago",
      skills: ["Digital Marketing", "Content Creation"],
      description: "Support our marketing team in creating engaging content and managing social media campaigns."
    },
    {
      id: 3,
      title: "Data Science Intern",
      company: "Analytics Pro",
      location: "Kisumu, Kenya",
      duration: "4 months",
      type: "Internship",
      posted: "3 days ago",
      skills: ["Python", "SQL", "Machine Learning"],
      description: "Work on real-world data analysis projects and gain hands-on experience with data science tools."
    });