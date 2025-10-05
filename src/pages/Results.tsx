import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Download, Search, Mail, Calendar, Eye } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

const performanceData = [
  { name: "Excellent", value: 35, color: "hsl(var(--chart-2))" },
  { name: "Good", value: 40, color: "hsl(var(--chart-1))" },
  { name: "Average", value: 20, color: "hsl(var(--chart-4))" },
  { name: "Below Average", value: 5, color: "hsl(var(--chart-5))" },
];

const skillsData = [
  { skill: "JavaScript", count: 20 },
  { skill: "Python", count: 15 },
  { skill: "React", count: 12 },
  { skill: "Node.js", count: 10 },
  { skill: "Angular", count: 8 },
  { skill: "Java", count: 14 },
  // { skill: "Spring Boot", count: 9 },
  // { skill: "Django", count: 6 },
  // { skill: "AWS", count: 7 },
  // { skill: "Vue.js", count: 5 },
];

const activityData = [
  { month: "Oct", activity: 70 },
  { month: "Nov", activity: 75 },
  { month: "Dec", activity: 72 },
  { month: "Jan", activity: 78 },
  { month: "Feb", activity: 82 },
  // { month: "Mar", activity: 88 },
  // { month: "Apr", activity: 90 },
  // { month: "May", activity: 85 },
  // { month: "Jun", activity: 80 },
  // { month: "Jul", activity: 83 },
  // { month: "Aug", activity: 87 },
  // { month: "Sep", activity: 89 },
];

interface Employee {
  id: number;
  name: string;
  email: string;
  phone: string;
  experience: string;
  skills: string;
  activity: number;
  score: number;
  notes: string;
  education: string;
  certifications: string;
  projects: string;
  languages: string;
}

const employeeData: Employee[] = [
  {
    id: 1,
    name: "Aarav Sharma",
    email: "aarav.sharma@company.in",
    phone: "+91 98765 12345",
    experience: "5 years",
    skills: "React, Node.js, TypeScript",
    activity: 92,
    score: 95,
    notes: "Excellent performer",
    education: "B.Tech Computer Science, IIT Delhi",
    certifications: "AWS Certified Developer, React Professional",
    projects: "E-commerce Platform, Mobile App Redesign",
    languages: "English, Hindi",
  },
  {
    id: 2,
    name: "Priya Singh",
    email: "priya.singh@company.in",
    phone: "+91 91234 56789",
    experience: "3 years",
    skills: "Python, Django, PostgreSQL",
    activity: 88,
    score: 90,
    notes: "Strong technical skills",
    education: "M.Tech Software Engineering, IIT Bombay",
    certifications: "Python Professional, Django Expert",
    projects: "Data Analytics Dashboard, API Integration",
    languages: "English, Hindi",
  },
  {
    id: 3,
    name: "Rohan Mehta",
    email: "rohan.mehta@company.in",
    phone: "+91 99876 54321",
    experience: "7 years",
    skills: "Java, Spring, AWS",
    activity: 85,
    score: 88,
    notes: "Leadership potential",
    education: "B.Tech Computer Engineering, BITS Pilani",
    certifications: "AWS Solutions Architect, Java Master",
    projects: "Microservices Architecture, Cloud Migration",
    languages: "English, Hindi",
  },
  {
    id: 4,
    name: "Ananya Kapoor",
    email: "ananya.kapoor@company.in",
    phone: "+91 98765 43210",
    experience: "4 years",
    skills: "React, Vue, CSS",
    activity: 78,
    score: 82,
    notes: "Good team player",
    education: "B.Sc Web Development, Delhi University",
    certifications: "Frontend Developer, UX Design",
    projects: "Marketing Website, Component Library",
    languages: "English, Hindi",
  },
  {
    id: 5,
    name: "Vikram Rao",
    email: "vikram.rao@company.in",
    phone: "+91 91234 09876",
    experience: "2 years",
    skills: "JavaScript, HTML, CSS",
    activity: 70,
    score: 75,
    notes: "Needs mentoring",
    education: "B.Sc Information Technology, Anna University",
    certifications: "Web Developer Bootcamp",
    projects: "Company Blog, Landing Pages",
    languages: "English, Telugu",
  },
  {
    id: 6,
    name: "Isha Patel",
    email: "isha.patel@company.in",
    phone: "+91 99887 65432",
    experience: "6 years",
    skills: "Angular, Node.js, MongoDB",
    activity: 89,
    score: 91,
    notes: "Proactive and reliable",
    education: "B.Tech Information Technology, NIT Surat",
    certifications: "Angular Professional, Node.js Expert",
    projects: "Inventory Management System, CRM Tool",
    languages: "English, Gujarati",
  },
  {
    id: 7,
    name: "Arjun Kumar",
    email: "arjun.kumar@company.in",
    phone: "+91 98765 67890",
    experience: "8 years",
    skills: "Java, Spring Boot, Microservices",
    activity: 90,
    score: 93,
    notes: "Strong backend developer",
    education: "B.Tech Computer Science, IIT Kharagpur",
    certifications: "Java Expert, Spring Boot Professional",
    projects: "Banking System, Payment Gateway",
    languages: "English, Hindi",
  },
  {
    id: 8,
    name: "Sneha Reddy",
    email: "sneha.reddy@company.in",
    phone: "+91 91234 76543",
    experience: "5 years",
    skills: "Python, Flask, MySQL",
    activity: 86,
    score: 89,
    notes: "Great problem-solving skills",
    education: "B.Tech Computer Science, VIT Vellore",
    certifications: "Python Professional, Flask Expert",
    projects: "Online Booking System, Analytics Dashboard",
    languages: "English, Telugu",
  },
  {
    id: 9,
    name: "Karan Verma",
    email: "karan.verma@company.in",
    phone: "+91 99876 12345",
    experience: "4 years",
    skills: "React, Next.js, GraphQL",
    activity: 82,
    score: 85,
    notes: "Creative UI/UX developer",
    education: "B.Tech Computer Science, IIIT Hyderabad",
    certifications: "React Professional, GraphQL Expert",
    projects: "Social Media App, SaaS Platform",
    languages: "English, Hindi",
  },
  {
    id: 10,
    name: "Meera Joshi",
    email: "meera.joshi@company.in",
    phone: "+91 98765 98765",
    experience: "3 years",
    skills: "JavaScript, Vue.js, CSS",
    activity: 75,
    score: 78,
    notes: "Good team contributor",
    education: "B.Sc Web Development, Symbiosis Pune",
    certifications: "Frontend Developer, UI Designer",
    projects: "Corporate Website, Portfolio Platform",
    languages: "English, Marathi",
  },
  {
    id: 11,
    name: "Aditya Nair",
    email: "aditya.nair@company.in",
    phone: "+91 91234 87654",
    experience: "6 years",
    skills: "Java, Kotlin, Android Development",
    activity: 87,
    score: 90,
    notes: "Mobile app expert",
    education: "B.Tech Computer Science, NIT Trichy",
    certifications: "Android Developer, Kotlin Expert",
    projects: "Finance App, Healthcare App",
    languages: "English, Malayalam",
  },
  {
    id: 12,
    name: "Riya Desai",
    email: "riya.desai@company.in",
    phone: "+91 99887 43210",
    experience: "4 years",
    skills: "Python, Django, REST APIs",
    activity: 83,
    score: 86,
    notes: "Reliable backend developer",
    education: "B.Tech IT, PDPU Gandhinagar",
    certifications: "Django Expert, REST API Specialist",
    projects: "E-commerce API, Logistics Platform",
    languages: "English, Gujarati",
  },
  {
    id: 13,
    name: "Shivansh Gupta",
    email: "shivansh.gupta@company.in",
    phone: "+91 98765 54321",
    experience: "7 years",
    skills: "AWS, DevOps, Docker",
    activity: 91,
    score: 94,
    notes: "Excellent DevOps engineer",
    education: "B.Tech Computer Science, IIT Roorkee",
    certifications: "AWS Solutions Architect, Docker Expert",
    projects: "CI/CD Pipeline, Cloud Migration",
    languages: "English, Hindi",
  },
  {
    id: 14,
    name: "Pooja Choudhary",
    email: "pooja.choudhary@company.in",
    phone: "+91 91234 65432",
    experience: "3 years",
    skills: "React, Redux, TypeScript",
    activity: 80,
    score: 83,
    notes: "Quick learner",
    education: "B.Tech IT, Jaipur University",
    certifications: "React Professional, TypeScript Expert",
    projects: "E-learning Platform, Dashboard UI",
    languages: "English, Hindi",
  },
  // {
  //   id: 15,
  //   name: "Raghav Bhatia",
  //   email: "raghav.bhatia@company.in",
  //   phone: "+91 99876 56789",
  //   experience: "5 years",
  //   skills: "Node.js, Express, MongoDB",
  //   activity: 85,
  //   score: 88,
  //   notes: "Efficient backend developer",
  //   education: "B.Tech Computer Science, NIT Jaipur",
  //   certifications: "Node.js Professional, MongoDB Expert",
  //   projects: "Inventory System, API Development",
  //   languages: "English, Hindi",
  // },
  // {
  //   id: 16,
  //   name: "Tanvi Agarwal",
  //   email: "tanvi.agarwal@company.in",
  //   phone: "+91 98765 67891",
  //   experience: "4 years",
  //   skills: "Angular, TypeScript, RxJS",
  //   activity: 82,
  //   score: 85,
  //   notes: "Frontend specialist",
  //   education: "B.Tech IT, Amity University",
  //   certifications: "Angular Professional, TypeScript Expert",
  //   projects: "Dashboard UI, Admin Panel",
  //   languages: "English, Hindi",
  // },
  // {
  //   id: 17,
  //   name: "Aniket Kulkarni",
  //   email: "aniket.kulkarni@company.in",
  //   phone: "+91 91234 76541",
  //   experience: "6 years",
  //   skills: "Java, Spring Boot, Microservices",
  //   activity: 88,
  //   score: 91,
  //   notes: "Backend architecture expert",
  //   education: "B.Tech Computer Science, COEP Pune",
  //   certifications: "Java Expert, Spring Boot Professional",
  //   projects: "Banking System, Payment API",
  //   languages: "English, Marathi",
  // },
  // {
  //   id: 18,
  //   name: "Sakshi Verma",
  //   email: "sakshi.verma@company.in",
  //   phone: "+91 99887 87654",
  //   experience: "5 years",
  //   skills: "Python, Flask, PostgreSQL",
  //   activity: 84,
  //   score: 87,
  //   notes: "Strong problem-solving skills",
  //   education: "B.Tech Computer Science, JSS Academy",
  //   certifications: "Python Professional, Flask Expert",
  //   projects: "Analytics Platform, Data Processing Tool",
  //   languages: "English, Hindi",
  // },
  // {
  //   id: 19,
  //   name: "Harshad Rane",
  //   email: "harshad.rane@company.in",
  //   phone: "+91 98765 87654",
  //   experience: "7 years",
  //   skills: "AWS, Docker, Kubernetes",
  //   activity: 90,
  //   score: 93,
  //   notes: "Cloud infrastructure expert",
  //   education: "B.Tech IT, NIT Surat",
  //   certifications: "AWS Solutions Architect, Kubernetes Expert",
  //   projects: "Cloud Migration, CI/CD Pipelines",
  //   languages: "English, Marathi",
  // },
  // {
  //   id: 20,
  //   name: "Nisha Sharma",
  //   email: "nisha.sharma@company.in",
  //   phone: "+91 91234 98765",
  //   experience: "3 years",
  //   skills: "React, Next.js, Tailwind CSS",
  //   activity: 79,
  //   score: 82,
  //   notes: "UI/UX focused",
  //   education: "B.Tech IT, Lovely Professional University",
  //   certifications: "React Professional, UI/UX Designer",
  //   projects: "Portfolio Website, E-commerce UI",
  //   languages: "English, Hindi",
  // },
  // {
  //   id: 21,
  //   name: "Vivek Joshi",
  //   email: "vivek.joshi@company.in",
  //   phone: "+91 99876 43210",
  //   experience: "6 years",
  //   skills: "Java, Spring, Microservices",
  //   activity: 87,
  //   score: 90,
  //   notes: "Backend and architecture expert",
  //   education: "B.Tech Computer Science, IIT Guwahati",
  //   certifications: "Java Professional, Spring Expert",
  //   projects: "Enterprise System, API Development",
  //   languages: "English, Hindi",
  // },
  // {
  //   id: 22,
  //   name: "Aditi Rao",
  //   email: "aditi.rao@company.in",
  //   phone: "+91 98765 34567",
  //   experience: "4 years",
  //   skills: "Python, Django, REST APIs",
  //   activity: 81,
  //   score: 84,
  //   notes: "Reliable backend developer",
  //   education: "B.Tech IT, Christ University",
  //   certifications: "Python Professional, Django Expert",
  //   projects: "E-commerce API, HR Management System",
  //   languages: "English, Kannada",
  // },
  // {
  //   id: 23,
  //   name: "Manav Sethi",
  //   email: "manav.sethi@company.in",
  //   phone: "+91 91234 54321",
  //   experience: "5 years",
  //   skills: "Node.js, Express, MongoDB",
  //   activity: 85,
  //   score: 88,
  //   notes: "Efficient backend developer",
  //   education: "B.Tech Computer Science, IIT Roorkee",
  //   certifications: "Node.js Professional, MongoDB Expert",
  //   projects: "Inventory System, API Development",
  //   languages: "English, Hindi",
  // },
  // {
  //   id: 24,
  //   name: "Anushka Nair",
  //   email: "anushka.nair@company.in",
  //   phone: "+91 99887 65432",
  //   experience: "3 years",
  //   skills: "React, Redux, TypeScript",
  //   activity: 78,
  //   score: 81,
  //   notes: "Quick learner",
  //   education: "B.Tech IT, Amrita University",
  //   certifications: "React Professional, TypeScript Expert",
  //   projects: "E-learning Platform, Dashboard UI",
  //   languages: "English, Malayalam",
  // },
  // {
  //   id: 25,
  //   name: "Ritik Malhotra",
  //   email: "ritik.malhotra@company.in",
  //   phone: "+91 98765 23456",
  //   experience: "6 years",
  //   skills: "Java, Spring Boot, AWS",
  //   activity: 89,
  //   score: 92,
  //   notes: "Strong backend and cloud skills",
  //   education: "B.Tech Computer Science, NIT Trichy",
  //   certifications: "Java Expert, AWS Solutions Architect",
  //   projects: "Banking API, Cloud Migration",
  //   languages: "English, Hindi",
  // },
  // {
  //   id: 26,
  //   name: "Ishita Sharma",
  //   email: "ishita.sharma@company.in",
  //   phone: "+91 91234 67890",
  //   experience: "4 years",
  //   skills: "Angular, TypeScript, RxJS",
  //   activity: 83,
  //   score: 86,
  //   notes: "Frontend specialist",
  //   education: "B.Tech IT, LPU",
  //   certifications: "Angular Professional, TypeScript Expert",
  //   projects: "Dashboard UI, Admin Panel",
  //   languages: "English, Hindi",
  // },
  // {
  //   id: 27,
  //   name: "Siddharth Jain",
  //   email: "siddharth.jain@company.in",
  //   phone: "+91 99876 34567",
  //   experience: "5 years",
  //   skills: "Python, Flask, PostgreSQL",
  //   activity: 84,
  //   score: 87,
  //   notes: "Strong problem-solving skills",
  //   education: "B.Tech Computer Science, Manipal University",
  //   certifications: "Python Professional, Flask Expert",
  //   projects: "Analytics Platform, Data Processing Tool",
  //   languages: "English, Hindi",
  // },
  // {
  //   id: 28,
  //   name: "Maya Deshmukh",
  //   email: "maya.deshmukh@company.in",
  //   phone: "+91 98765 76543",
  //   experience: "3 years",
  //   skills: "React, Next.js, Tailwind CSS",
  //   activity: 80,
  //   score: 83,
  //   notes: "UI/UX focused",
  //   education: "B.Tech IT, Pune University",
  //   certifications: "React Professional, UI/UX Designer",
  //   projects: "Portfolio Website, E-commerce UI",
  //   languages: "English, Marathi",
  // },
  // {
  //   id: 29,
  //   name: "Kunal Gupta",
  //   email: "kunal.gupta@company.in",
  //   phone: "+91 91234 87653",
  //   experience: "6 years",
  //   skills: "Java, Spring, Microservices",
  //   activity: 88,
  //   score: 91,
  //   notes: "Backend and architecture expert",
  //   education: "B.Tech Computer Science, IIT Delhi",
  //   certifications: "Java Professional, Spring Expert",
  //   projects: "Enterprise System, API Development",
  //   languages: "English, Hindi",
  // },
  // {
  //   id: 30,
  //   name: "Sanya Kapoor",
  //   email: "sanya.kapoor@company.in",
  //   phone: "+91 99887 76543",
  //   experience: "4 years",
  //   skills: "Python, Django, REST APIs",
  //   activity: 82,
  //   score: 85,
  //   notes: "Reliable backend developer",
  //   education: "B.Tech IT, Delhi University",
  //   certifications: "Python Professional, Django Expert",
  //   projects: "E-commerce API, HR Management System",
  //   languages: "English, Hindi",
  // },
];

const Results = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedEmployees, setSelectedEmployees] = useState<number[]>([]);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  // transformed.profile_data.work_experience
  const data = {
    "transformed": {
      "profile_url": "https://www.linkedin.com/in/abhimanyu-raja/",
      "extraction_timestamp": "",
      "profile_data": {
        "basic_info": {
          "name": "Abhimanyu Singh",
          "headline": "Managing Director | Bobby Facility Management Pvt Ltd",
          "location": "Indore, Madhya Pradesh, India",
          "summary": "Building tech to solve the labour economy, for once and forever. Looking to team up with passionate people who want to work on difficult problems.",
          "profile_image_url": "https://media.licdn.com/dms/image/v2/D4D03AQGRzjaSMiduQQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1715941800976?e=1762387200&v=beta&t=mUhdO7o_Q5Lk-X4owXShs4Q5Iyd3xHPtDXhlowf9Hrc"
        },
        "work_experience": [{
          "title": "Managing Director",
          "company": "Bobby Facility Management Pvt Ltd",
          "duration": "2020-10-01 - Present",
          "location": "Indore, Madhya Pradesh, India",
          "description": null,
          "is_current": true
        }],
        "education": [{
          "school": "Devi Ahilya Vishwavidyalaya",
          "degree": "Master of Arts - MA",
          "field_of_study": "Psychology",
          "duration": "2015-07-01 - 2017-07-01"
        }, {
          "school": "International Institute of Professional Studies, IIPS, DAVV, Indore",
          "degree": "Bachelor of Business Administration - BBA",
          "field_of_study": "Management Science",
          "duration": "2012-07-01 - 2015-05-01"
        }],
        "skills": [],
        "contact_info": {},
        "recent_work_experience": [{
          "title": "Managing Director",
          "company": "Bobby Facility Management Pvt Ltd",
          "duration": "2020-10-01 - Present",
          "location": "Indore, Madhya Pradesh, India",
          "description": null,
          "is_current": true
        }]
      },
      "extraction_metadata": {
        "credits_used": 100,
        "extraction_method": "linkedin_crustdata_search_fallback",
        "focus": "recent_work_experiences",
        "note": "Used LinkedIn search helper as fallback due to direct scraping being blocked"
      }
    },
    "stdout": "<trace><title>Starting LinkedIn Profile Extraction</title><data>{'url': 'https://www.linkedin.com/in/abhimanyu-raja/', 'user_name': 'abhimanyu'}</data></trace>\n<trace><title>URL Validation Passed</title><data>undefined</data></trace>\n<trace><title>Calling Firecrawl to Extract Profile Data</title><data>{'url': 'https://www.linkedin.com/in/abhimanyu-raja/', 'extract_format': 'extract'}</data></trace>\n<trace><title>Firecrawl Response Received</title><data>{}</data></trace>\n<trace><title>Empty Firecrawl Response - Trying LinkedIn Helper</title><data>undefined</data></trace>\n<trace><title>Attempting LinkedIn People Search</title><data>{'search_name': 'abhimanyu', 'profile_username': 'abhimanyu-raja'}</data></trace>\n<trace><title>LinkedIn Search Response</title><data>{'status': 200, 'data': [{'name': 'Abhi Sivasailam', 'location': 'San Francisco, California, United States', 'linkedin_profile_url': 'https://www.linkedin.com/in/ACwAAASql0oBA9gUViJPjGOqEHgstkfMy1UuB2c', 'linkedin_profile_urn': 'ACwAAASql0oBA9gUViJPjGOqEHgstkfMy1UuB2c', 'default_position_title': 'CEO | Founder', 'default_position_company_linkedin_id': '19116572', 'default_position_is_decision_maker': True, 'flagship_profile_url': 'https://www.linkedin.com/in/abhi-sivasailam', 'profile_picture_url': 'https://media.licdn.com/dms/image/v2/C5603AQHwhs5rpklL9w/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1549170807057?e=1762387200&v=beta&t=DBTzo7jKvnKMxi72mW-KqSSWPuQ8IVYWLJASnpwDbgc', 'headline': 'Building the OS for data-driven companies', 'summary': None, 'num_of_connections': 1553, 'related_colleague_company_id': None, 'skills': ['Data Analysis', 'Research', 'Economics', 'Policy Analysis', 'Public Policy', 'Statistics', 'Qualitative Research', 'Quantitative Research', 'Public Speaking', 'Economic Research', 'Political Campaigns', 'Policy Research', 'Quantitative Analytics', 'Management Consulting', 'Marketing Strategy', 'Financial Modeling', 'Quantitative Analysis', 'Quantitative Modeling', 'Survey Design', 'Technical Writing', 'Political Consulting', 'Marketing Analytics', 'Economic Modeling', 'Programming', 'Writing', 'Business Strategy', 'Business Operations', 'Surveys', 'Team Building', 'Conference Speaking', 'Cluster Analysis', 'Analytics', 'Leadership'], 'employer': [{'title': 'CEO | Founder', 'company_name': 'Levers Labs', 'company_linkedin_id': '19116572', 'company_logo_url': 'https://media.licdn.com/dms/image/v2/D560BAQHLgQ-Ls2_KDA/company-logo_400_400/company-logo_400_400/0/1707091119399/levers_labs_logo?e=1762387200&v=beta&t=HmLj_lt__ADEVrJLe8cbRRprfB0H1Q5wcACV17i65b0', 'start_date': '2023-04-01T00:00:00', 'end_date': None, 'position_id': 1090674984, 'description': \"We're building the operating system for data-driven companies. We provide products and services to help companies define their growth model and use that model to run, learn, and grow.\", 'location': 'San Francisco Bay Area', 'rich_media': []}, {'title': 'Mentor', 'company_name': 'First Round Capital', 'company_linkedin_id': '555078', 'company_logo_url': 'https://media.licdn.com/dms/image/v2/D560BAQGzdnk04NxhLA/company-logo_400_400/B56ZWq4d.FHQAY-/0/1742328684688/first_round_capital_logo?e=1762387200&v=beta&t=EXJwZNJOknwhAobaGzkRqUtGYMDjecaRre1Xswmlzrw', 'start_date': '2021-01-01T00:00:00', 'end_date': None, 'position_id': 1832929476, 'description': None, 'location': None, 'rich_media': []}, {'title': 'CEO | Founder', 'company_name': 'Levers Analytics', 'company_linkedin_id': '97192025', 'company_logo_url': 'https://media.licdn.com/dms/image/v2/D4E0BAQFmoq6HIGua0g/company-logo_400_400/company-logo_400_400/0/1708497701437/levers_analytics_logo?e=1762387200&v=beta&t=V2Us5Uq54VZV_Wir4m7zmEUqbAmj_hppXS6AO_3FUWY', 'start_date': '2015-01-01T00:00:00', 'end_date': None, 'position_id': 2345027728, 'description': 'We help companies build their data foundation. Wherever they are in their data maturity journey, we get our clients the metrics, reporting, and analytics they need to operate -- fast. We are the primary maintainers of the SOMA standard, and typically get our clients 300+ operating metrics in 2-4 weeks.', 'location': None, 'rich_media': []}, {'title': 'Management Consultant', 'company_name': 'Accenture', 'company_linkedin_id': '1033', 'company_logo_url': 'https://media.licdn.com/dms/image/v2/D4D0BAQEgtOEcxlXMog/company-logo_400_400/B4DZfqEQWkHAAg-/0/1751978673981/accenture_logo?e=1761782400&v=beta&t=46EyBWcfvhuFTCgjpUOIpHCEdVcBe5wXItqtx1tip8A', 'start_date': '2012-04-01T00:00:00', 'end_date': '2015-06-01T00:00:00', 'position_id': 353493709, 'description': 'Classical management consulting, predictive marketing analytics, data strategy, economic consulting, and information technology consulting for Fortune 100 clients in healthcare, retail, and chemicals sectors', 'location': None, 'rich_media': []}, {'title': 'Advisor', 'company_name': 'Pathrise', 'company_linkedin_id': '18427103', 'company_logo_url': 'https://media.licdn.com/dms/image/v2/C560BAQGxfF2aGCdM6w/company-logo_400_400/company-logo_400_400/0/1630613536115/pathrise_logo?e=1761782400&v=beta&t=ea-NGWMpwEzesOCQtmL41t_kDeLMBZZW-ikmz_HqKb8', 'start_date': '2021-09-01T00:00:00', 'end_date': '2024-01-01T00:00:00', 'position_id': 2415944518, 'description': None, 'location': None, 'rich_media': []}, {'title': 'Senior Director of Growth and Data', 'company_name': 'Keap', 'company_linkedin_id': '19011410', 'company_logo_url': 'https://media.licdn.com/dms/image/v2/C560BAQEsnYObwEqIkA/company-logo_400_400/company-logo_400_400/0/1660001426314/keap_growing_logo?e=1761782400&v=beta&t=bz4v4mgwbE0vM9uHLlh6_6GembgYN01CThWG4ZnsDgQ', 'start_date': '2017-09-01T00:00:00', 'end_date': '2019-02-01T00:00:00', 'position_id': 1090651870, 'description': 'Led teams of analysts, engineers, data scientists, and growth hackers to help empower Keap to use data to make decisions and drive value for small businesses around the world.', 'location': 'San Francisco Bay Area', 'rich_media': []}, {'title': 'Data and Growth', 'company_name': 'HoneyBook', 'company_linkedin_id': '2527444', 'company_logo_url': 'https://media.licdn.com/dms/image/v2/D560BAQFmoMpqAzqh2w/company-logo_400_400/B56Zeig0FIGoAc-/0/1750778200874/honeybook_logo?e=1762387200&v=beta&t=Yd2h6FmV678QiMiQgj0-sXJhU1HCvHG_jE8uzyRDt80', 'start_date': '2014-11-01T00:00:00', 'end_date': '2017-09-01T00:00:00', 'position_id': 729246529, 'description': None, 'location': 'San Francisco Bay Area', 'rich_media': []}, {'title': 'Advisor', 'company_name': 'PeopleSet', 'company_linkedin_id': '29361570', 'company_logo_url': 'https://media.licdn.com/dms/image/v2/C560BAQHY_icUeUZWRg/company-logo_400_400/company-logo_400_400/0/1630599666887/peopleset_logo?e=1762387200&v=beta&t=KPZ-kcTsyUplVGm55KrucCRqmtUSeUCs50fduuzGsuQ', 'start_date': '2019-12-01T00:00:00', 'end_date': '2021-12-01T00:00:00', 'position_id': 1570962253, 'description': None, 'location': 'San Francisco Bay Area', 'rich_media': []}, {'title': 'Head of Growth and Analytics; Head of Flexport Insights', 'company_name': 'Flexport', 'company_linkedin_id': '3131483', 'company_logo_url': 'https://media.licdn.com/dms/image/v2/D560BAQEqsGr5MshAsg/company-logo_400_400/company-logo_400_400/0/1715897702397/flexport_logo?e=1762387200&v=beta&t=dIJ_L3B5N2Ir8qRSQA3A8o3cZqh1IlwXGkvDfmZf5Dg', 'start_date': '2019-07-01T00:00:00', 'end_date': '2022-07-01T00:00:00', 'position_id': 1543493687, 'description': 'Led and scaled Data Analytics, Data Science, Analytics Engineering, Data Platform, and Data Commercialization functions to support evidence-based decision making throughout the enterprise.\\n\\nIntroduced \"growth teams\"; formed/led Product-Led Growth, Growth Marketing, Growth Product teams.', 'location': 'San Francisco Bay Area', 'rich_media': []}, {'title': 'Senior Director of Growth and Analytics', 'company_name': 'Hustle', 'company_linkedin_id': '6451629', 'company_logo_url': 'https://media.licdn.com/dms/image/v2/D4E0BAQE1r45Qen3urg/company-logo_400_400/B4EZc2ZKkEHkAY-/0/1748964256321/hustle_texting_logo?e=1762387200&v=beta&t=vNjJCYu3_eYJrAnx99UcguIesh-DCPldH7QAKzUDyS4', 'start_date': '2019-02-01T00:00:00', 'end_date': '2019-08-01T00:00:00', 'position_id': 1507643817, 'description': 'Led a cross-functional team of data analysts, data scientists, sales/marketing operations, performance marketers, product marketers, and growth hackers to drive top of funnel growth.', 'location': 'San Francisco Bay Area', 'rich_media': []}, {'title': 'Advisor', 'company_name': 'Mason', 'company_linkedin_id': '9266888', 'company_logo_url': 'https://media.licdn.com/dms/image/v2/C560BAQGnxHr7KodPRA/company-logo_400_400/company-logo_400_400/0/1645638336581/mason_america_logo?e=1761782400&v=beta&t=lZX1ZtVBhwBcK1sUQog2cR3Sdd10AWRwSeYIVJ0Mwwg', 'start_date': '2019-01-01T00:00:00', 'end_date': '2019-07-01T00:00:00', 'position_id': 1575613958, 'description': None, 'location': 'San Francisco Bay Area', 'rich_media': []}], 'education_background': [{'degree_name': 'Bachelor of Science - BS', 'institute_name': 'University of Missouri-Columbia', 'field_of_study': 'Statistics', 'start_date': None, 'end_date': None, 'institute_linkedin_id': '5442', 'institute_linkedin_url': 'https://www.linkedin.com/school/5442/', 'institute_logo_url': 'https://media.licdn.com/dms/image/v2/C4D0BAQGLlncXGXUvTQ/company-logo_400_400/company-logo_400_400/0/1631310247206?e=1762387200&v=beta&t=Fl38loCSZrjWrQjG7_6ra4M0FPHY94L-hWFFX0YLaF0'}, {'degree_name': 'Master of Science - MS', 'institute_name': 'University of Missouri-Columbia', 'field_of_study': 'Statistics', 'start_date': None, 'end_date': None, 'institute_linkedin_id': '5442', 'institute_linkedin_url': 'https://www.linkedin.com/school/5442/', 'institute_logo_url': 'https://media.licdn.com/dms/image/v2/C4D0BAQGLlncXGXUvTQ/company-logo_400_400/company-logo_400_400/0/1631310247206?e=1762387200&v=beta&t=Fl38loCSZrjWrQjG7_6ra4M0FPHY94L-hWFFX0YLaF0'}, {'degree_name': 'Bachelor of Science (B.S.)', 'institute_name': 'University of Missouri-Columbia', 'field_of_study': 'Economics', 'start_date': None, 'end_date': None, 'institute_linkedin_id': '5442', 'institute_linkedin_url': 'https://www.linkedin.com/school/5442/', 'institute_logo_url': 'https://media.licdn.com/dms/image/v2/C4D0BAQGLlncXGXUvTQ/company-logo_400_400/company-logo_400_400/0/1631310247206?e=1762387200&v=beta&t=Fl38loCSZrjWrQjG7_6ra4M0FPHY94L-hWFFX0YLaF0'}], 'emails': [], 'websites': [], 'twitter_handle': None, 'languages': ['Tamil (Native or bilingual proficiency)', 'Hindi (Professional working proficiency)', 'French (Limited working proficiency)'], 'pronoun': None, 'query_person_linkedin_urn': 'ACwAAASql0oBA9gUViJPjGOqEHgstkfMy1UuB2c', 'linkedin_slug_or_urns': ['abhi-sivasailam', 'ACwAAASql0oBA9gUViJPjGOqEHgstkfMy1UuB2c'], 'current_title': 'Mentor'}, {'name': 'Abhimanyu Singh', 'location': 'Indore, Madhya Pradesh, India', 'linkedin_profile_url': 'https://www.linkedin.com/in/ACwAADJ4yRUBNyiqvQlQmtWLqa7q3EqREBDDdEI', 'linkedin_profile_urn': 'ACwAADJ4yRUBNyiqvQlQmtWLqa7q3EqREBDDdEI', 'default_position_title': 'Managing Director', 'default_position_company_linkedin_id': '102749912', 'default_position_is_decision_maker': True, 'flagship_profile_url': 'https://www.linkedin.com/in/abhimanyu-singh-9057001b7', 'profile_picture_url': 'https://media.licdn.com/dms/image/v2/D4D03AQGRzjaSMiduQQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1715941800976?e=1762387200&v=beta&t=mUhdO7o_Q5Lk-X4owXShs4Q5Iyd3xHPtDXhlowf9Hrc', 'headline': 'Managing Director | Bobby Facility Management Pvt Ltd', 'summary': 'Building tech to solve the labour economy, for once and forever. Looking to team up with passionate people who want to work on difficult problems.', 'num_of_connections': 36, 'related_colleague_company_id': 102749912, 'skills': [], 'employer': [{'title': 'Managing Director', 'company_name': 'Bobby Facility Management Pvt Ltd', 'company_linkedin_id': '102749912', 'company_logo_url': 'https://media.licdn.com/dms/image/v2/D560BAQEyIxw0cn2gXQ/company-logo_400_400/company-logo_400_400/0/1719255437930/bobby_facility_management_pvt_ltd_logo?e=1762387200&v=beta&t=5f9bToOa_5oPxd0-2FObAQI94qb0gJdkchfzPLZlUV8', 'start_date': '2020-10-01T00:00:00', 'end_date': None, 'position_id': 1909266412, 'description': None, 'location': 'Indore, Madhya Pradesh, India', 'is_default': True, 'rich_media': []}], 'education_background': [{'degree_name': 'Master of Arts - MA', 'institute_name': 'Devi Ahilya Vishwavidyalaya', 'field_of_study': 'Psychology', 'start_date': '2015-07-01T00:00:00', 'end_date': '2017-07-01T00:00:00', 'institute_linkedin_id': '827817', 'institute_linkedin_url': 'https://www.linkedin.com/school/827817/', 'institute_logo_url': 'https://media.licdn.com/dms/image/v2/C4D0BAQGgj4SDJHjnEQ/company-logo_400_400/company-logo_400_400/0/1631332211512?e=1762387200&v=beta&t=8WTws9ogCS9gsPjWIUQ84ZWmdBsCbT0308CmTBVmvL4'}, {'degree_name': 'Bachelor of Business Administration - BBA', 'institute_name': 'International Institute of Professional Studies, IIPS, DAVV, Indore', 'field_of_study': 'Management Science', 'start_date': '2012-07-01T00:00:00', 'end_date': '2015-05-01T00:00:00', 'institute_linkedin_id': '35939736', 'institute_linkedin_url': 'https://www.linkedin.com/school/35939736/', 'institute_logo_url': 'https://media.licdn.com/dms/image/v2/C4E0BAQHPCA7Yx1le7A/company-logo_400_400/company-logo_400_400/0/1630629646361/iips_davv_logo?e=1762387200&v=beta&t=6z3mQOj_pHFIoqdrGr7WA68dTvohjWftaoFACsBU8D0'}], 'emails': [], 'websites': [], 'twitter_handle': None, 'languages': [], 'pronoun': None, 'query_person_linkedin_urn': 'ACwAADJ4yRUBNyiqvQlQmtWLqa7q3EqREBDDdEI', 'linkedin_slug_or_urns': ['ACwAADJ4yRUBNyiqvQlQmtWLqa7q3EqREBDDdEI', 'abhimanyu-singh-9057001b7'], 'current_title': 'Managing Director'}, {'name': 'Abhimanyu Goel', 'location': 'Singapore, Singapore', 'linkedin_profile_url': 'https://www.linkedin.com/in/ACwAAAyRtz0B_t3peOu-zxgZNbltq5-yhDWz27s', 'linkedin_profile_urn': 'ACwAAAyRtz0B_t3peOu-zxgZNbltq5-yhDWz27s', 'default_position_title': 'Senior Research Associate (Design and Additive Manufacturing Building Systems)', 'default_position_company_linkedin_id': '5524', 'default_position_is_decision_maker': False, 'flagship_profile_url': 'https://www.linkedin.com/in/goelabhimanyu', 'profile_picture_url': 'https://media.licdn.com/dms/image/v2/D4D03AQEv_QCO8iD0YQ/profile-displayphoto-shrink_400_400/B4DZbLzq_QHAAk-/0/1747176048492?e=1762387200&v=beta&t=KdpaPu6KXMpM6Jod2FjEiAhKgvFtiwlmLjxdNwqeZtA', 'headline': 'Senior Researcher, Sustainable Design and Materials ', 'summary': 'Sustainability and Creative Design specialist, reliable team leader with a systems thinking approach. Over 10 years of experience in initiating, developing and implementing architectural design and research projects across Singapore and Asia. I have been working with 4 different departments at NUS in the last 8-9 years, my projects revolve around developing environmental sustainable design solutions for building and urban design. Received many professional recognitions. A people’s person.', 'num_of_connections': 2271, 'related_colleague_company_id': 5524, 'skills': ['Research and Development (R&D)', 'Project Delivery', 'Client Liaison', 'Written Communication', 'Report Writing', 'Oral Communication', 'Skilled Multi-tasker', 'Microsoft PowerPoint', 'Research', 'Leadership', 'Problem Solving', 'Laboratory Skills', 'Public Speaking', 'Prototyping', 'Fused Deposition Modeling (FDM)', 'Prototype production', 'Additive Manufacturing', 'Scanning Electron Microscopy (SEM)', 'UV/Vis Spectroscopy', 'Biochar', 'Microstructure', 'Lightweight materials', 'Waste to Energy', 'Low Carbon Technologies', 'Sustainability', 'Concept Development', 'Framework Design', 'Creative Problem Solving', 'University Teaching', 'Waste Management', 'urban metabolism', '3D Prototyping', '3D Printing', 'Design for Manufacturing', 'Sustainable Design', 'SketchUp', 'Architectural Design', 'AutoCAD', 'Photoshop', 'Microsoft Office', 'Architecture', 'Design Research', 'Urban Design', 'Interior Design', 'Mixed-use', 'Rendering', 'Sketching', 'Concept Design', 'Design Management', 'Adobe Photoshop'], 'employer': [{'title': 'Senior Research Associate (Design and Additive Manufacturing Building Systems)', 'company_name': 'National University of Singapore', 'company_linkedin_id': '5524', 'company_logo_url': 'https://media.licdn.com/dms/image/v2/C4D0BAQGvBq9cz6AIIQ/company-logo_400_400/company-logo_400_400/0/1631313842677?e=1762387200&v=beta&t=TypvWBVaOSNj_aj5ymOBgx8MtVxgt5pwgAZDfAoYtoU', 'start_date': '2021-04-01T00:00:00', 'end_date': None, 'position_id': 2020362707, 'description': 'My current role and responsibilities include architectural research and managing 3 major projects in NUS as\\nresearch associate. My projects revolve around additive manufacturing and prototyping of small to large\\nscale building components. Small scale building components are inspired from microstructure to make\\nlighter and stronger shapes of 3D Printed blocks. Large scale components are direct 3D Printed structures in\\nconcrete and can be assembled on site directly.\\nI am responsible for 3D Designing the components, prototyping of the 3D Printed modules and managing\\nmy assistants and students in the additive manufacturing labs.\\nOne key responsibility for all my projects is to oversee end to end deliverables and completion of projects\\nin time.\\nMajor challenge was faced during the COVID time where there could be no physical meetings. My\\nexperience in supervising and following up with the external collaborators have been an asset to my\\nnetworking skills in Singapore.', 'location': 'Singapore', 'is_default': True, 'rich_media': []}, {'title': 'Co-Founder', 'company_name': 'Modesi Chocolates', 'company_linkedin_id': '97226607', 'company_logo_url': 'https://media.licdn.com/dms/image/v2/D560BAQFKIfDA_NCJ9g/company-logo_400_400/company-logo_400_400/0/1696228862737?e=1762387200&v=beta&t=oRzqrSbLN73dVjqiB-cYPHlzzxIVTo20jfUrrA-5WcQ', 'start_date': '2019-05-01T00:00:00', 'end_date': None, 'position_id': 2262680944, 'description': None, 'location': 'Singapore', 'is_default': False, 'rich_media': []}, {'title': 'Research Associate (Urban Systems Design)', 'company_name': 'National Research Foundation Singapore (NRF)', 'company_linkedin_id': '3644028', 'company_logo_url': 'https://media.licdn.com/dms/image/v2/D560BAQFkVedaMYPQsw/company-logo_400_400/company-logo_400_400/0/1683004845752/nrfsg_logo?e=1762387200&v=beta&t=NeAuDDQQLHDYRl5aAmKmDqNgEW7PNC707A43v4Qkm3o', 'start_date': '2019-02-01T00:00:00', 'end_date': '2021-05-01T00:00:00', 'position_id': 1463875137, 'description': 'Urban Metabolism Analysis (UMA) is an important tool for studying the use of energy and resources in urban ecosystems (Wolman, 1965). Applying methods such as material flow analysis, substance flow analysis, and energy flow analysis, UMA is able to quantify, describe and evaluate the sustainability of different flows and stocks (that is, accumulation) of energy and materials within an economy or geographical boundary. UMA is also effective in tracing any evolutions of these variables with time. Broadly speaking, large metabolic throughput, low metabolic efficiency, and disordered metabolic processes are known to cause an urban system to become “unhealthy” and unsustainable. State-of-art UMA methodology combines flow and stock analyses with top-down economic input-output analyses (an example is shown in the diagram above) and bottom-up process-based life cycle assessment (LCA), in order to evaluate the state of sustainability due to the use of materials and energy by the waste utilization technologies', 'location': 'Singapore', 'is_default': False, 'rich_media': []}, {'title': 'Research Associate & Additive Manufacturing specialist', 'company_name': 'National University of Singapore', 'company_linkedin_id': '5524', 'company_logo_url': 'https://media.licdn.com/dms/image/v2/C4D0BAQGvBq9cz6AIIQ/company-logo_400_400/company-logo_400_400/0/1631313842677?e=1762387200&v=beta&t=TypvWBVaOSNj_aj5ymOBgx8MtVxgt5pwgAZDfAoYtoU', 'start_date': '2018-08-01T00:00:00', 'end_date': '2019-01-01T00:00:00', 'position_id': 1408302771, 'description': None, 'location': 'Singapore', 'is_default': False, 'rich_media': []}, {'title': 'Research Assistant (Design Architect)', 'company_name': 'National University of Singapore', 'company_linkedin_id': '5524', 'company_logo_url': 'https://media.licdn.com/dms/image/v2/C4D0BAQGvBq9cz6AIIQ/company-logo_400_400/company-logo_400_400/0/1631313842677?e=1762387200&v=beta&t=TypvWBVaOSNj_aj5ymOBgx8MtVxgt5pwgAZDfAoYtoU', 'start_date': '2016-08-01T00:00:00', 'end_date': '2018-08-01T00:00:00', 'position_id': 870840997, 'description': 'Minimising construction waste in Singapore: A whole-of-life investigation\\n\\nConstruction and demolition waste represents a significant wastage of natural resources and energy while also contributing to air pollution. Measures to reduce construction waste include flexibility in design of new buildings and recovery of materials and components from existing buildings or adaptation of existing buildings to new uses. Although prolonging the building life through designing for adaptation can reduce the rate of demolition, the low rate of renewal of buildings means that material recovery and whole building reuse are equally important in minimising construction waste. While quality of recovered material/component depends on the original design and recovery process, there is a lack of measures to promote the use of recovered materials. Changes in decision making on how buildings are designed, demolished and reused can therefore significantly improve the resilience of building stock and reduce the adverse impacts. While theoretical underpinnings of designing for deconstruction or adaptation of existing buildings are well established, their practice depends more on location, policy issues, and incentives. The various research papers we published discuss the preliminary findings from a research project which aims to develop a set of guidelines on designing for flexibility based on lifetime environmental and financial performance of alternative strategies and generate data on relative environmental performance of recovered construction materials/components compared with their virgin alternatives used in Singapore.\\nKey words: adaptive reuse, deconstruction, waste recovery, heritage conservation, in-use adaptation, Singapore', 'location': 'Singapore', 'is_default': False, 'rich_media': []}, {'title': 'Master Student and researcher', 'company_name': 'National University of Singapore', 'company_linkedin_id': '5524', 'company_logo_url': 'https://media.licdn.com/dms/image/v2/C4D0BAQGvBq9cz6AIIQ/company-logo_400_400/company-logo_400_400/0/1631313842677?e=1762387200&v=beta&t=TypvWBVaOSNj_aj5ymOBgx8MtVxgt5pwgAZDfAoYtoU', 'start_date': '2015-07-01T00:00:00', 'end_date': '2016-07-01T00:00:00', 'position_id': 783151240, 'description': 'WHY ‘INTEGRATED DESIGN’ MATTERS TO ASIA. How we navigate Asia’s future depends in part on how well we understand the process by which buildings and cities are designed and operated. \\n \\nAsia is expected to account for 50% of additional world-wide energy demands over the next 15 years and 50% of the world’s new buildings. It already contributes significantly to rising global emissions, vanishing biodiversity, shrinking agricultural land, loss of community and ecological networks. Of the many changes which have swept Asia during the last half-century, none have been as far reaching as the recorded increase in urban footprints and densities. This demographic shift, from rural to urban, poses profound challenges to how new cities are designed, how they grow, what they displace.\\n\\nThe design-construction process, as we know it, is fragmented. Experts and professionals work in isolation, short-term spending overrides long-term costs, project goals do not balance multiple stakeholder needs and viewpoints. There are many barriers and lapses at the drawing-board and in policy that contribute to poor as-built performance.\\n\\nIntegrated Design is the active merger of knowledge and viewpoints. It is the engagement all disciplines and stakeholders – architects, engineers, builders, etc. – responsible for the built environment. It is, in effect, management of divergent, often conflicting inputs towards long-term goals. And where this process focuses explicitly on ecological and humanitarian goals, Asia’s buildings and cities are one step closer to becoming sustainable.', 'location': 'Singapore', 'is_default': False, 'rich_media': []}, {'title': 'Research Architect', 'company_name': 'Ministry of Education, Singapore (MOE)', 'company_linkedin_id': '547288', 'company_logo_url': 'https://media.licdn.com/dms/image/v2/C510BAQHAN66kKwHXeg/company-logo_400_400/company-logo_400_400/0/1630617800769/ministry_of_education_singapore_logo?e=1762387200&v=beta&t=sHcYRX8m853P0APT-uhZhvHhr6trlgtgSSDZ8OXnVs4', 'start_date': '2016-08-01T00:00:00', 'end_date': '2018-07-01T00:00:00', 'position_id': 1337282731, 'description': None, 'location': None, 'is_default': False, 'rich_media': []}, {'title': 'Architect intern', 'company_name': 'CPG Corporation', 'company_linkedin_id': '51412', 'company_logo_url': 'https://media.licdn.com/dms/image/v2/D560BAQFCzaGOCsFIjg/company-logo_400_400/B56ZavLWPqGoAY-/0/1746695710060/cpg_corporation_logo?e=1762387200&v=beta&t=E8N-MTM6hnUlDxKAtFzSitgOk2gpe-QM7xduBijebRM', 'start_date': '2016-04-01T00:00:00', 'end_date': '2016-08-01T00:00:00', 'position_id': 791856704, 'description': 'Experience in Hospital and Healthcare division, part of international design team for projects in Asia and the Middle East. Important part of projects for Dubai Health Authority and Indira Gandhi Memorial Hospital, Maldives', 'location': 'Singapore', 'is_default': False, 'rich_media': []}, {'title': 'Architect, Design Manager', 'company_name': 'Xebec Design and Facilities Pvt Ltd', 'company_linkedin_id': '609564', 'company_logo_url': 'https://media.licdn.com/dms/image/v2/C560BAQHAJ8-fWcwcbQ/company-logo_400_400/company-logo_400_400/0/1631351000229?e=1762387200&v=beta&t=f_ZaKBTUVrRcvJZUp5mIuuSAx_Fl8Z8kUl8JJxjaNKU', 'start_date': '2015-01-01T00:00:00', 'end_date': '2015-04-01T00:00:00', 'position_id': 783900819, 'description': None, 'location': 'New Delhi Area, India', 'is_default': False, 'rich_media': []}, {'title': 'Researcher of closed loop systems revolving around sustainability & design', 'company_name': 'Auroville Green Practices', 'company_linkedin_id': '9188057', 'company_logo_url': 'https://media.licdn.com/dms/image/v2/C560BAQFxW-2AWvX1eQ/company-logo_400_400/company-logo_400_400/0/1631375834320?e=1762387200&v=beta&t=mQxXDnmYFsAKOsTNhM5GpN5QD0S38e9lR5m5o6h7egc', 'start_date': '2014-06-01T00:00:00', 'end_date': '2014-08-01T00:00:00', 'position_id': 783150405, 'description': None, 'location': 'Auroville, Tamil Nadu, India', 'is_default': False, 'rich_media': []}, {'title': 'Architect', 'company_name': 'Studiobba: Bharadwaj Bharadwaj and Associates', 'company_linkedin_id': None, 'company_logo_url': None, 'start_date': '2012-06-01T00:00:00', 'end_date': '2014-06-01T00:00:00', 'position_id': 328108382, 'description': 'From sketches to master planning, competitions, old age home for the blind, residential, educational institutions', 'location': 'New Delhi Area, India', 'is_default': False, 'rich_media': []}], 'education_background': [{'degree_name': 'Master of Science (M.Sc.)', 'institute_name': 'National University of Singapore', 'field_of_study': 'Sustainable Design', 'start_date': '2015-01-01T00:00:00', 'end_date': '2016-01-01T00:00:00', 'institute_linkedin_id': '5524', 'institute_linkedin_url': 'https://www.linkedin.com/school/5524/', 'institute_logo_url': 'https://media.licdn.com/dms/image/v2/C4D0BAQGvBq9cz6AIIQ/company-logo_400_400/company-logo_400_400/0/1631313842677?e=1762387200&v=beta&t=TypvWBVaOSNj_aj5ymOBgx8MtVxgt5pwgAZDfAoYtoU'}, {'degree_name': 'Bachelor of Architecture (B.Arch.) Apeejay School of Architecture', 'institute_name': 'FACULTY OF ARCHITECTURE, UPTU,LUCKNOW', 'field_of_study': 'Architecture and Related Services', 'start_date': '2009-01-01T00:00:00', 'end_date': '2014-01-01T00:00:00', 'institute_linkedin_id': '15099832', 'institute_linkedin_url': 'https://www.linkedin.com/school/15099832/', 'institute_logo_url': 'https://media.licdn.com/dms/image/v2/C4E0BAQHm9MKRjC1N-g/company-logo_400_400/company-logo_400_400/0/1651831317520/faculty_of_architecture_uptu_lucknow_logo?e=1762387200&v=beta&t=yaTblVDzNOdafVbvKQDrNYXBtzVTEqfK1ReBBcMnE8M'}], 'emails': [], 'websites': ['https://issuu.com/abhimanyugoel'], 'twitter_handle': None, 'languages': ['English', 'Hindi', 'Punjabi'], 'pronoun': None, 'query_person_linkedin_urn': 'ACwAAAyRtz0B_t3peOu-zxgZNbltq5-yhDWz27s', 'linkedin_slug_or_urns': ['goelabhimanyu', 'ACwAAAyRtz0B_t3peOu-zxgZNbltq5-yhDWz27s'], 'current_title': 'Co-Founder'}, {'name': 'Abhimanyu Yadav', 'location': 'Bengaluru, Karnataka, India', 'linkedin_profile_url': 'https://www.linkedin.com/in/ACwAAAu9G0AB8vMxZpOGAJd_1KALlXapd4LZW60', 'linkedin_profile_urn': 'ACwAAAu9G0AB8vMxZpOGAJd_1KALlXapd4LZW60', 'default_position_title': 'Manager', 'default_position_company_linkedin_id': '13291650', 'default_position_is_decision_maker': False, 'flagship_profile_url': 'https://www.linkedin.com/in/abhimanyu-yadav', 'profile_picture_url': 'https://media.licdn.com/dms/image/v2/D4D03AQHoDkF2aYRFlQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1679825177980?e=1762387200&v=beta&t=yPJlnkrAo4qVVpDaLozTuwf8oyQgLTPz76C1NZYtqjc', 'headline': 'Operations | Quality | Supply chain | Advanced Electronics', 'summary': 'A Passionate Value Enabler with functional expertise in Operations, Manufacturing & Supply Chain.', 'num_of_connections': 1147, 'related_colleague_company_id': 13291650, 'skills': ['Shop floor management', 'Packaging Engineering', 'Project Estimation', 'Productivity Improvement', 'Supplier Performance', 'QFD', 'New Product Implementations', 'Strategy', 'Supply Chain Management', 'Voice of the Customer', 'Polymers', 'Demand Planning', 'Vendor Management', 'Supplier Quality Management', 'Manufacturing Process Improvement', 'capex', 'Cost Management', 'Design for Manufacturing', 'Manufacturing', 'Engineering', 'Quality Assurance', 'Kaizen', 'Lean Manufacturing', 'Continuous Improvement', 'Statistical Process Control (SPC)', 'Product Development', 'Root Cause Analysis', 'Project Management', 'ISO/TS 16949', 'Statistical Data Analysis', 'Statistical Modeling', 'Advanced Product Quality Planning (APQP)', 'PPAP', 'Internal Audit', 'Design of Experiments (DOE)', 'Product Design', 'Quality Management', 'Material Requirements Planning (MRP)', 'Enterprise Resource Planning (ERP)', 'Production Planning', 'Lean Six Sigma', 'Financial Accounting', 'Process Simulation', 'Reliability', 'Geometric Dimensioning & Tolerancing', 'Process Control', 'Quality Auditing', 'Supplier Development', 'ISO 9000', 'Microsoft Excel', 'PowerPoint', 'Minitab', 'SolidWorks', 'QRM', 'MSA', 'PFMEA', '7 QC Tools', 'DraftSight', 'SAP HANA', 'SAP Business ByDesign', 'Product Modelling', 'Measurement System Analysis', 'Supplier Quality Engineering', 'Microsoft SQL Server', 'AutoCAD', 'Metal Fabrication', 'Project Planning'], 'employer': [{'title': 'Manager', 'company_name': 'Maxwell Energy Systems', 'company_linkedin_id': '13291650', 'company_logo_url': 'https://media.licdn.com/dms/image/v2/D4D0BAQFI6iFQ3g4xWw/company-logo_400_400/company-logo_400_400/0/1666270849205/ionenergyinc_logo?e=1762387200&v=beta&t=Kt0H-nnNd4WqDsLbC_YTCY5X1_XHK4Lsg2kC8me53fA', 'start_date': '2024-06-01T00:00:00', 'end_date': None, 'position_id': 2421611218, 'description': 'Leading End-End Quality Management for Advance Embedded Electronics at Maxwell.', 'location': 'Bengaluru, Karnataka, India', 'is_default': True, 'rich_media': []}, {'title': 'Manufacturing Projects', 'company_name': 'Avengard ', 'company_linkedin_id': '66689496', 'company_logo_url': 'https://media.licdn.com/dms/image/v2/C560BAQEiuEjRLhMDUw/company-logo_400_400/company-logo_400_400/0/1630654468087/avengardpartners_logo?e=1762387200&v=beta&t=5gJYMbWdbwQBGU1x506MB4WVMTIRD_gcegf-5AZFYjc', 'start_date': '2022-04-01T00:00:00', 'end_date': None, 'position_id': 1803970536, 'description': 'Instituted my own Partnership Firm to help Indian micro and cottage industry adopt Digital Resource planning using SAP ByDesign suite. After my return back from the USA, we spotted a market gap in serving segment of the industry long looked over by majority of existing independent ERP consultants. \\n \\n• Executed ERP deployment projects for 7+ clients across vendor management, Quality Assurance, Procurement, Product Planning, Finance & CRM modules within SAP ByDesign Ecosystem. We Customized ByDesign solutions to meet specific granular enterprise & domain level needs. \\n• During this phase of my life with 5 associates, I delved and honed myself in almost all aspects of running a small business from Finance to compliance, Marketing to operations, Sales to delivery.', 'location': 'Gurugram, Haryana, India', 'is_default': False, 'rich_media': []}, {'title': 'Supplier Development Specialist', 'company_name': 'IMI', 'company_linkedin_id': '82766', 'company_logo_url': 'https://media.licdn.com/dms/image/v2/D4E0BAQE2-hq9H2ePtA/company-logo_400_400/company-logo_400_400/0/1709275327610/imi_logo?e=1762387200&v=beta&t=jyt2mjwelMQdXWpthnrARk-MwU78nUc2OPGtZwaL9Ss', 'start_date': '2020-01-01T00:00:00', 'end_date': None, 'position_id': 1616889259, 'description': None, 'location': 'Seattle, Washington, United States', 'is_default': False, 'rich_media': []}, {'title': 'Graduate Teaching Assistant', 'company_name': 'University of Wisconsin-Madison', 'company_linkedin_id': '4099', 'company_logo_url': 'https://media.licdn.com/dms/image/v2/C560BAQFyYW54n5mwAw/company-logo_400_400/company-logo_400_400/0/1630601304331/university_of_wisconsin_madison_logo?e=1762387200&v=beta&t=BPYfE8GjQ0EhSX8nEn_w5dX-q1Efz_wxCOPTx565yLs', 'start_date': '2019-08-01T00:00:00', 'end_date': None, 'position_id': 1642402505, 'description': None, 'location': 'Madison, Wisconsin, United States', 'is_default': False, 'rich_media': []}, {'title': 'Industrial Engineer op', 'company_name': 'Emerson', 'company_linkedin_id': '2753', 'company_logo_url': 'https://media.licdn.com/dms/image/v2/D4E0BAQGR6FSAnbBWcQ/company-logo_400_400/company-logo_400_400/0/1719847292095/emerson_logo?e=1762387200&v=beta&t=xKOfmrfjW_dibZ9cH26BIvwb2Frh3nshXhM2ibp1CW8', 'start_date': '2018-08-01T00:00:00', 'end_date': None, 'position_id': 2361024902, 'description': 'worked as a right hand man of The plant head, leading capex proposals, facilities planning CFT, nearshoring/ sourcing resilience among several other initiatives.', 'location': 'Chattanooga, Tennessee, United States', 'is_default': False, 'rich_media': []}, {'title': 'Engineering Projects Consultant', 'company_name': 'Wacker Neuson SE', 'company_linkedin_id': '479690', 'company_logo_url': 'https://media.licdn.com/dms/image/v2/C4E0BAQH69JMTJ75I2w/company-logo_400_400/company-logo_400_400/0/1631354622715?e=1762387200&v=beta&t=o8pECGkLL-CloeE8fWPpcURU_Zr9f5J7Pwyi2zGEz8M', 'start_date': '2018-05-01T00:00:00', 'end_date': None, 'position_id': 1327308421, 'description': 'Created Regression models to statistically optimize Inventory Management & movement at Wacker Neuson', 'location': 'Milwaukee, Wisconsin, United States', 'is_default': False, 'rich_media': []}, {'title': 'Graduate Teaching Assistant', 'company_name': 'University of Wisconsin-Madison', 'company_linkedin_id': '4099', 'company_logo_url': 'https://media.licdn.com/dms/image/v2/C560BAQFyYW54n5mwAw/company-logo_400_400/company-logo_400_400/0/1630601304331/university_of_wisconsin_madison_logo?e=1762387200&v=beta&t=BPYfE8GjQ0EhSX8nEn_w5dX-q1Efz_wxCOPTx565yLs', 'start_date': '2017-09-01T00:00:00', 'end_date': '2018-05-01T00:00:00', 'position_id': 1572626744, 'description': None, 'location': 'Madison, Wisconsin, United States', 'is_default': False, 'rich_media': []}, {'title': 'Process Improvement Consultant', 'company_name': 'Amcor', 'company_linkedin_id': '6311', 'company_logo_url': 'https://media.licdn.com/dms/image/v2/C4D0BAQF0sed-lbowMg/company-logo_400_400/company-logo_400_400/0/1630499181382/amcor_logo?e=1762387200&v=beta&t=BtYBGitraVBRoHr04KXx3Tc3j3OcXwtjizNFpCfK7cM', 'start_date': '2017-09-01T00:00:00', 'end_date': '2017-12-01T00:00:00', 'position_id': 1135866390, 'description': '• Optimizing Shipping Quality Control Documentation by getting rid of redundancies, decreasing the man-hours spent on documentational work by upto 40% with the help of cloud initiatives & reassessment of customer needs.\\n• Conducted Root Cause Analysis using 7 QC tools, and applied DMAIC approach for Process improvement.', 'location': 'Madison, Wisconsin, United States', 'is_default': False, 'rich_media': []}, {'title': 'Quality Engineer', 'company_name': 'Amtek Auto Ltd.', 'company_linkedin_id': '330930', 'company_logo_url': 'https://media.licdn.com/dms/image/v2/C510BAQG01XpuQCFxVw/company-logo_400_400/company-logo_400_400/0/1631308069831?e=1762387200&v=beta&t=BwzXV7BeedGgE2xn5WWHEABShzekBDVwOVeynU3EVeU', 'start_date': '2015-09-01T00:00:00', 'end_date': '2017-04-01T00:00:00', 'position_id': 709785418, 'description': None, 'location': 'Gurugram, Haryana, India', 'is_default': False, 'rich_media': []}], 'education_background': [{'degree_name': 'Master of Science ', 'institute_name': 'University of Wisconsin-Madison', 'field_of_study': 'Manufacturing Systems Engineering - Minor in SCM', 'start_date': '2017-08-01T00:00:00', 'end_date': '2019-11-01T00:00:00', 'institute_linkedin_id': '4099', 'institute_linkedin_url': 'https://www.linkedin.com/school/4099/', 'institute_logo_url': 'https://media.licdn.com/dms/image/v2/C560BAQFyYW54n5mwAw/company-logo_400_400/company-logo_400_400/0/1630601304331/university_of_wisconsin_madison_logo?e=1762387200&v=beta&t=BPYfE8GjQ0EhSX8nEn_w5dX-q1Efz_wxCOPTx565yLs'}, {'degree_name': 'Bachelor of Technology - BTech', 'institute_name': 'National Institute of Advanced Manufacturing Technology Ranchi (Formerly NIFFT)', 'field_of_study': 'Manufacturing Engineering', 'start_date': '2011-04-01T00:00:00', 'end_date': '2015-05-01T00:00:00', 'institute_linkedin_id': '13578151', 'institute_linkedin_url': 'https://www.linkedin.com/school/13578151/', 'institute_logo_url': 'https://media.licdn.com/dms/image/v2/C4E0BAQFg05rarfW51w/company-logo_400_400/company-logo_400_400/0/1639567269068/nifftofficial_logo?e=1762387200&v=beta&t=edg_j3icm0CNMxL_YUQzqdCRPMkGRpgAAuHMMWFnRoM'}], 'emails': [], 'websites': [], 'twitter_handle': None, 'languages': [], 'pronoun': None, 'query_person_linkedin_urn': 'ACwAAAu9G0AB8vMxZpOGAJd_1KALlXapd4LZW60', 'linkedin_slug_or_urns': ['abhimanyu-yadav', 'ACwAAAu9G0AB8vMxZpOGAJd_1KALlXapd4LZW60'], 'current_title': 'Engineering Projects Consultant'}, {'name': 'Abhi Joshi', 'location': 'Solapur, Maharashtra, India', 'linkedin_profile_url': 'https://www.linkedin.com/in/ACwAABMv4qQBIUAvDcw6vxZ6sV2uMvATxgRD2oU', 'linkedin_profile_urn': 'ACwAABMv4qQBIUAvDcw6vxZ6sV2uMvATxgRD2oU', 'default_position_title': 'Freelance Digital Marketer', 'default_position_company_linkedin_id': '106298415', 'default_position_is_decision_maker': False, 'flagship_profile_url': 'https://www.linkedin.com/in/joshiabhishek08', 'profile_picture_url': 'https://media.licdn.com/dms/image/v2/D4D03AQHw6bHFv9xDDg/profile-displayphoto-shrink_400_400/B4DZOIHRPrHUAg-/0/1733155428130?e=1762387200&v=beta&t=lKGh50AjpLCtI-PruJsBWWAK8V7MALnnf21ZxsiW7a0', 'headline': 'Digital Marketer | HighLevel Expert | Webflow Developer', 'summary': '🚀 Digital Marketing & Automation Specialist | CRM & Growth Expert\\n\\nWith over 4 years of experience in digital marketing, I specialize in CRM automation, lead generation, and business growth strategies that help companies scale efficiently. My expertise lies in leveraging marketing technology to optimize sales funnels, automate workflows, and enhance customer engagement.\\n\\n💡 What I Bring to the Table:\\n✅ CRM & Automation Mastery – Building & optimizing sales pipelines, workflows, and integrations.\\n✅ WhatsApp Business API & Lead Generation – Automating communication for higher conversions.\\n✅ LinkedIn Growth & Outreach – Strategies to attract and nurture high-value clients.\\n✅ Web Design & SEO – Creating conversion-driven websites with Webflow.\\n✅ Paid Ads & Funnel Building – Running high-ROI campaigns across Facebook, Google, and LinkedIn.\\n\\n🎯 Passionate About:\\nI thrive on helping businesses streamline operations, improve retention, and scale revenue using cutting-edge marketing strategies. With a strong foundation in sales, automation, and digital strategy, I’m always looking for innovative ways to drive growth.\\n\\n📩 Let’s Connect!\\nOpen to collaborations and discussions on marketing automation, growth strategies, and business scaling.', 'num_of_connections': 1210, 'related_colleague_company_id': 106298415, 'skills': ['Web Content Creation', 'Content Marketing', 'Internet Content', 'Advertising', 'Strategic Marketing Management', 'Channel Sales', 'Webflow Development', 'GoHighLevel Automations', 'Digital Marketing Media', 'Marketing Automation', 'Webflow', 'Graphic editing', 'Digital Strategy', 'Marketing Management', 'Analytical Skills', 'WordPress', 'WooCommerce', 'Canva', 'Lead Generation', 'Social Media Marketing', 'CorelDRAW', 'Adobe Premiere Pro', 'Negotiation', 'Business Development', 'Business-to-Business (B2B)', 'Digital Marketing', 'Responsive Web Design', 'Funnel Optimization', 'Web Content Writing', 'Content Management', 'Content Strategy', 'Mobile Content Distribution', 'Search Engine Optimization (SEO)', 'Content Re-Distribution', 'Social Media Management', 'Video Editing', 'Marketing', 'Sales', 'Project Management', 'Customer Satisfaction', 'Customer Retention', 'Real Estate', 'Finance', 'Banking', 'Cross Selling', 'Business Requirements', 'PowerPoint', 'Microsoft Office', 'Microsoft Word', 'Microsoft Excel', 'Office 365', 'Microsoft PowerPoint', 'Management', 'Customer Service', 'Business Relationship Management', 'Client Relations', 'Communication', 'Presentation Skills', 'Social Networking', 'Online Search'], 'employer': [{'title': 'Freelance Digital Marketer', 'company_name': 'Sweet Build Studio', 'company_linkedin_id': '106298415', 'company_logo_url': 'https://media.licdn.com/dms/image/v2/D560BAQFupBWI97qixg/company-logo_400_400/company-logo_400_400/0/1737975394054?e=1762387200&v=beta&t=d0dCDfOtpJC7QYdMpDaxud7E5hQ2qDHC9uGE36Q0Afk', 'start_date': '2019-03-01T00:00:00', 'end_date': None, 'position_id': 2602141448, 'description': 'Designed and developed WordPress websites, optimizing them for user experience and SEO to drive organic traffic.\\nManaged and executed high-ROI Facebook Ad campaigns, reducing ad costs and increasing lead generation.\\nOptimized Google Business Profiles, improving local SEO rankings and enhancing brand visibility.\\nCreated landing pages and sales funnels to boost conversions and improve customer acquisition.\\nImplemented data-driven strategies to enhance campaign performance and maximize marketing ROI.\\nCollaborated with clients to understand business needs and deliver customized marketing solutions.', 'location': 'Solapur, Maharashtra, India', 'is_default': True, 'rich_media': []}, {'title': 'Content Specialist', 'company_name': 'Rich + Niche Digital Marketing Academy', 'company_linkedin_id': '53243471', 'company_logo_url': 'https://media.licdn.com/dms/image/v2/D560BAQEruBEPCZyttg/company-logo_400_400/B56ZVPEXMaHoAY-/0/1740788299030/richandniche_logo?e=1762387200&v=beta&t=7HZCIkY7ck_rBJNkXBkbORbEzTVheSkJauj9eG3MEsA', 'start_date': '2022-06-01T00:00:00', 'end_date': '2023-06-01T00:00:00', 'position_id': 2602139792, 'description': '• Managed blog, video, and YouTube content, driving audience engagement and brand growth.\\n• Developed an efficient content marketing process that streamlined video production and publishing.\\n• Increased YouTube channel growth by 300+ subscribers per month through optimized content strategies.\\n• Enhanced blog and podcast reach by implementing SEO-driven content marketing techniques.\\n• Optimized video titles, descriptions, and thumbnails to improve discoverability and watch time.\\n• Worked both remotely and onsite in Belgrade, Serbia, collaborating closely with the team.', 'location': 'Belgrade, Serbia', 'is_default': False, 'rich_media': []}, {'title': 'Marketing Manager', 'company_name': 'HTC DEPOT LTD', 'company_linkedin_id': '98457994', 'company_logo_url': 'https://media.licdn.com/dms/image/v2/D4E0BAQGvyF5CFX9aaA/company-logo_400_400/company-logo_400_400/0/1691405083603?e=1762387200&v=beta&t=APOCv1aHwKiKbEeYn5Au_PXnx6oRap98gEHsh4jsHhk', 'start_date': '2021-04-01T00:00:00', 'end_date': '2022-04-01T00:00:00', 'position_id': 2602142046, 'description': '• Led the marketing strategy for Hatoum Trading Company in Accra, Ghana, driving brand awareness and customer engagement across digital and offline channels.\\n• Managed and scaled the company’s digital presence, including blogs, social media (Facebook, Instagram), YouTube content, and eCommerce site, resulting in a whopping 200% increase in online traffic.\\n• Oversaw and optimized Facebook Ads for lead generation, achieving a 30% reduction in cost per lead (CPL) while increasing qualified leads by 50%.\\n• Designed and executed local print marketing campaigns, including flyers, brochures, and banners, strengthening the brand’s offline visibility.\\n• Led a team of 4, including a designer, video editor, and 2 sales executives, ensuring seamless collaboration and timely execution of marketing projects.\\n• Enhanced Google Business Profile and managed customer reviews, leading to a 4.8-star rating and a 60% boost in local search visibility.\\n• Created promotional and educational videos for YouTube, growing the subscriber base and increasing video engagement by 3X.\\n• Spearheaded event participation in key industry conferences and trade shows, generating high-value B2B connections and brand exposure.', 'location': 'Accra, Greater Accra Region, Ghana', 'is_default': False, 'rich_media': []}, {'title': 'Territory Sales Manager', 'company_name': 'Tata Motors Finance', 'company_linkedin_id': '353909', 'company_logo_url': 'https://media.licdn.com/dms/image/v2/C510BAQHizSHk5HgcNQ/company-logo_400_400/company-logo_400_400/0/1630569828855/tata_motors_finance_logo?e=1762387200&v=beta&t=YM2U7sUGwKe8c4JTOAr8_wPhGnkzzMnZpYXnXT_5dHQ', 'start_date': '2016-06-01T00:00:00', 'end_date': '2018-04-01T00:00:00', 'position_id': 2602141219, 'description': '• Increased sales volume and market share of my 5 person sales team by achieving 110%+ of the assigned sales targets within the territory.\\n• Built and maintained strong customer relationships, leading to a 25% increase in customer retention and referrals.\\n• Managed and motivated a dealer sales team of 20+ members, resulting in a 30% improvement in overall team performance.\\n• Developed and implemented sales strategies that contributed to a 15% YoY growth in revenue.\\n• Trained and upskilled dealer sales representatives, improving their sales efficiency and product knowledge.\\n• Planned and monitored sales targets, ensuring consistent achievement of monthly and quarterly goals.\\n• Ensured 100% compliance with company policies and sales procedures while maintaining high ethical standards.', 'location': 'Mumbai, Maharashtra, India', 'is_default': False, 'rich_media': []}, {'title': 'Senior Executive Corporate Sales', 'company_name': '99acres.com', 'company_linkedin_id': '13652026', 'company_logo_url': 'https://media.licdn.com/dms/image/v2/C4D0BAQHMdyTJv7cx5g/company-logo_400_400/company-logo_400_400/0/1648037812590/99acres_logo?e=1762387200&v=beta&t=iAIz17PwXVYba7DeZy2_6CcuSaarH4fjx5RrRpv8CXw', 'start_date': '2015-07-01T00:00:00', 'end_date': '2016-04-01T00:00:00', 'position_id': 2602139322, 'description': '• Sold online property solutions to 50+ real estate developers and consultants, tailoring offerings to their business needs.\\n• Achieved 120%+ of sales targets in best months, by acquiring 5+ new clients per quarter in the assigned territory.\\n• Generated 500+ qualified leads through referrals, cold calling, and strategic networking.\\n• Increased client engagement by 30%, conducting weekly product demonstrations and training sessions to ensure seamless adoption.\\n• Collaborated with Legal, Finance, and Product teams to maintain 100% compliance with company policies and streamline processes.', 'location': 'Pune, Maharashtra, India', 'is_default': False, 'rich_media': []}], 'education_background': [{'degree_name': 'Master of Business Administration - MBA', 'institute_name': 'Sinhgad Institute Of Management', 'field_of_study': 'Marketing', 'start_date': '2014-08-01T00:00:00', 'end_date': '2016-06-01T00:00:00', 'institute_linkedin_id': '15140340', 'institute_linkedin_url': 'https://www.linkedin.com/school/15140340/', 'institute_logo_url': 'https://media.licdn.com/dms/image/v2/D4D0BAQHz7gyac8fAIQ/company-logo_400_400/company-logo_400_400/0/1721464216970?e=1762387200&v=beta&t=rDRJgK72xYj35mMN6LSlsTwxKJ3KCFbM3qWxMtbMWRk'}, {'degree_name': 'Bachelor of Business Administration - BBA', 'institute_name': 'INSTITUTE OF MANAGEMENT STUDIES, DAVV, INDORE', 'field_of_study': 'E-Commerce/Electronic Commerce', 'start_date': '2011-08-01T00:00:00', 'end_date': '2014-06-01T00:00:00', 'institute_linkedin_id': '13464856', 'institute_linkedin_url': 'https://www.linkedin.com/school/13464856/', 'institute_logo_url': 'https://media.licdn.com/dms/image/v2/C4E0BAQHSm99Nw0eEgQ/company-logo_400_400/company-logo_400_400/0/1631343980242?e=1762387200&v=beta&t=S-rRi9IK2XoAruoUIGVwFoiRsr2dY9A9Xi-_61PWzCA'}], 'emails': [], 'websites': [], 'twitter_handle': None, 'languages': [], 'pronoun': None, 'query_person_linkedin_urn': 'ACwAABMv4qQBIUAvDcw6vxZ6sV2uMvATxgRD2oU', 'linkedin_slug_or_urns': ['ACwAABMv4qQBIUAvDcw6vxZ6sV2uMvATxgRD2oU', 'joshiabhishek08'], 'current_title': 'Freelance Digital Marketer'}], 'credits_cost': 100}</data></trace>\n<trace><title>Profile Match Found</title><data>{'match_type': 'name_match' if name_match else 'url_match', 'profile_name': 'abhimanyu singh', 'search_name': 'abhimanyu'}</data></trace>\n<trace><title>Found Matching Profile</title><data>{'name': 'Abhimanyu Singh', 'location': 'Indore, Madhya Pradesh, India', 'linkedin_profile_url': 'https://www.linkedin.com/in/ACwAADJ4yRUBNyiqvQlQmtWLqa7q3EqREBDDdEI', 'linkedin_profile_urn': 'ACwAADJ4yRUBNyiqvQlQmtWLqa7q3EqREBDDdEI', 'default_position_title': 'Managing Director', 'default_position_company_linkedin_id': '102749912', 'default_position_is_decision_maker': True, 'flagship_profile_url': 'https://www.linkedin.com/in/abhimanyu-singh-9057001b7', 'profile_picture_url': 'https://media.licdn.com/dms/image/v2/D4D03AQGRzjaSMiduQQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1715941800976?e=1762387200&v=beta&t=mUhdO7o_Q5Lk-X4owXShs4Q5Iyd3xHPtDXhlowf9Hrc', 'headline': 'Managing Director | Bobby Facility Management Pvt Ltd', 'summary': 'Building tech to solve the labour economy, for once and forever. Looking to team up with passionate people who want to work on difficult problems.', 'num_of_connections': 36, 'related_colleague_company_id': 102749912, 'skills': [], 'employer': [{'title': 'Managing Director', 'company_name': 'Bobby Facility Management Pvt Ltd', 'company_linkedin_id': '102749912', 'company_logo_url': 'https://media.licdn.com/dms/image/v2/D560BAQEyIxw0cn2gXQ/company-logo_400_400/company-logo_400_400/0/1719255437930/bobby_facility_management_pvt_ltd_logo?e=1762387200&v=beta&t=5f9bToOa_5oPxd0-2FObAQI94qb0gJdkchfzPLZlUV8', 'start_date': '2020-10-01T00:00:00', 'end_date': None, 'position_id': 1909266412, 'description': None, 'location': 'Indore, Madhya Pradesh, India', 'is_default': True, 'rich_media': []}], 'education_background': [{'degree_name': 'Master of Arts - MA', 'institute_name': 'Devi Ahilya Vishwavidyalaya', 'field_of_study': 'Psychology', 'start_date': '2015-07-01T00:00:00', 'end_date': '2017-07-01T00:00:00', 'institute_linkedin_id': '827817', 'institute_linkedin_url': 'https://www.linkedin.com/school/827817/', 'institute_logo_url': 'https://media.licdn.com/dms/image/v2/C4D0BAQGgj4SDJHjnEQ/company-logo_400_400/company-logo_400_400/0/1631332211512?e=1762387200&v=beta&t=8WTws9ogCS9gsPjWIUQ84ZWmdBsCbT0308CmTBVmvL4'}, {'degree_name': 'Bachelor of Business Administration - BBA', 'institute_name': 'International Institute of Professional Studies, IIPS, DAVV, Indore', 'field_of_study': 'Management Science', 'start_date': '2012-07-01T00:00:00', 'end_date': '2015-05-01T00:00:00', 'institute_linkedin_id': '35939736', 'institute_linkedin_url': 'https://www.linkedin.com/school/35939736/', 'institute_logo_url': 'https://media.licdn.com/dms/image/v2/C4E0BAQHPCA7Yx1le7A/company-logo_400_400/company-logo_400_400/0/1630629646361/iips_davv_logo?e=1762387200&v=beta&t=6z3mQOj_pHFIoqdrGr7WA68dTvohjWftaoFACsBU8D0'}], 'emails': [], 'websites': [], 'twitter_handle': None, 'languages': [], 'pronoun': None, 'query_person_linkedin_urn': 'ACwAADJ4yRUBNyiqvQlQmtWLqa7q3EqREBDDdEI', 'linkedin_slug_or_urns': ['ACwAADJ4yRUBNyiqvQlQmtWLqa7q3EqREBDDdEI', 'abhimanyu-singh-9057001b7'], 'current_title': 'Managing Director'}</data></trace>\n<trace><title>Successfully Extracted via LinkedIn Helper</title><data>{'profile_url': 'https://www.linkedin.com/in/abhimanyu-raja/', 'extraction_timestamp': '', 'profile_data': {'basic_info': {'name': 'Abhimanyu Singh', 'headline': 'Managing Director | Bobby Facility Management Pvt Ltd', 'location': 'Indore, Madhya Pradesh, India', 'summary': 'Building tech to solve the labour economy, for once and forever. Looking to team up with passionate people who want to work on difficult problems.', 'profile_image_url': 'https://media.licdn.com/dms/image/v2/D4D03AQGRzjaSMiduQQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1715941800976?e=1762387200&v=beta&t=mUhdO7o_Q5Lk-X4owXShs4Q5Iyd3xHPtDXhlowf9Hrc'}, 'work_experience': [{'title': 'Managing Director', 'company': 'Bobby Facility Management Pvt Ltd', 'duration': '2020-10-01 - Present', 'location': 'Indore, Madhya Pradesh, India', 'description': None, 'is_current': True}], 'education': [{'school': 'Devi Ahilya Vishwavidyalaya', 'degree': 'Master of Arts - MA', 'field_of_study': 'Psychology', 'duration': '2015-07-01 - 2017-07-01'}, {'school': 'International Institute of Professional Studies, IIPS, DAVV, Indore', 'degree': 'Bachelor of Business Administration - BBA', 'field_of_study': 'Management Science', 'duration': '2012-07-01 - 2015-05-01'}], 'skills': [], 'contact_info': {}, 'recent_work_experience': [{'title': 'Managing Director', 'company': 'Bobby Facility Management Pvt Ltd', 'duration': '2020-10-01 - Present', 'location': 'Indore, Madhya Pradesh, India', 'description': None, 'is_current': True}]}, 'extraction_metadata': {'credits_used': 100, 'extraction_method': 'linkedin_crustdata_search_fallback', 'focus': 'recent_work_experiences', 'note': 'Used LinkedIn search helper as fallback due to direct scraping being blocked'}}</data></trace>",
    "stderr": null,
    "duration": 15953.92918586731,
    "credits_cost": 2,
    "backend_used": "Modal Labs"
  }
  const avg = Math.round(Math.random() * 40 + 60); // Random avg between 60 and 100


  const url = "https://api-d7b62b.stack.tryrelevance.com/latest/studios/4fbac788-2a22-4daa-af34-976140e9641f/trigger_webhook?project=c224dd38-7731-4a87-aad8-2052226ec0bc";

  // const data = {
  //   linkedin_profile_url: "https://www.linkedin.com/in/rabindra-nath-mahato/",
  //   user_name: "rabindra"
  // };

  // axios.post(url, data, {
  //   headers: {
  //     "Content-Type": "application/json"
  //   }
  // })
  //   .then(response => {
  //     console.log("✅ Success:", response.data);
  //   })
  //   .catch(error => {
  //     console.error("❌ Error:", error.response?.data || error.message);
  //   });

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedEmployees(employeeData.map((emp) => emp.id));
    } else {
      setSelectedEmployees([]);
    }
  };

  const handleSelectEmployee = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedEmployees([...selectedEmployees, id]);
    } else {
      setSelectedEmployees(selectedEmployees.filter((empId) => empId !== id));
    }
  };

  const handleViewDetails = (employee: Employee) => {
    setSelectedEmployee(employee);
    setDetailsOpen(true);
  };

  const handleSendMail = () => {
    if (selectedEmployees.length === 0) {
      toast({
        title: "No employees selected",
        description: "Please select at least one employee to send mail.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Email prepared",
      description: `Preparing to send email to ${selectedEmployees.length} employee(s)`,
    });
  };

  const handleScheduleMeeting = () => {
    if (selectedEmployees.length === 0) {
      toast({
        title: "No employees selected",
        description:
          "Please select at least one employee to schedule a meeting.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Meeting scheduled",
      description: `Meeting invitation sent to ${selectedEmployees.length} employee(s)`,
    });
  };

  const allSelected = selectedEmployees.length === employeeData.length;
  const someSelected =
    selectedEmployees.length > 0 &&
    selectedEmployees.length < employeeData.length;

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Button variant="ghost" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <a
            href="http://localhost:8080/re.pdf" // URL of the PDF
            download="re.pdf" // Desired file name
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </a>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-12">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Analysis Results</h1>
            <p className="text-muted-foreground">Engineering Team Q1</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
              <h3 className="text-sm font-medium text-muted-foreground mb-4">
                Performance Distribution
              </h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={performanceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {performanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
              <h3 className="text-sm font-medium text-muted-foreground mb-4">
                Top Skills
              </h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={skillsData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--border))"
                  />
                  <XAxis
                    dataKey="skill"
                    tick={{ fontSize: 10 }}
                    stroke="hsl(var(--muted-foreground))"
                  />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip />
                  <Bar
                    dataKey="count"
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
              <h3 className="text-sm font-medium text-muted-foreground mb-4">
                6-Month Activity Trend
              </h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={activityData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--border))"
                  />
                  <XAxis
                    dataKey="month"
                    stroke="hsl(var(--muted-foreground))"
                  />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="activity"
                    stroke="hsl(var(--accent))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--accent))" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-card rounded-lg border border-border shadow-sm">
            <div className="p-6 border-b border-border">
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search employees..." className="pl-10" />
                </div>
                <Button
                  variant="outline"
                  onClick={handleSendMail}
                  disabled={selectedEmployees.length === 0}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Send Mail
                </Button>
                <Button
                  variant="outline"
                  onClick={handleScheduleMeeting}
                  disabled={selectedEmployees.length === 0}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Meeting
                </Button>
              </div>
              {selectedEmployees.length > 0 && (
                <p className="text-sm text-muted-foreground mt-4">
                  {selectedEmployees.length} employee(s) selected
                </p>
              )}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-6 py-3 text-left">
                      <Checkbox
                        checked={allSelected}
                        onCheckedChange={handleSelectAll}
                        aria-label="Select all employees"
                        className={
                          someSelected ? "data-[state=checked]:bg-primary" : ""
                        }
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Experience
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Skills Extracted
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Last 6mo Activity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Performance Score
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Notes
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {employeeData.map((employee, i) => (
                    <tr
                      key={employee.id}
                      className="hover:bg-muted/30 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <Checkbox
                          checked={selectedEmployees.includes(employee.id)}
                          onCheckedChange={(checked) =>
                            handleSelectEmployee(
                              employee.id,
                              checked as boolean
                            )
                          }
                          aria-label={`Select ${employee.name}`}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-medium">
                        {employee.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                        {employee.experience}
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {employee.skills}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-muted rounded-full h-2 max-w-[100px]">
                            <div
                              className="bg-accent h-2 rounded-full"
                              style={{ width: `${employee.activity}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">
                            {avg - (Math.floor(Math.random() * 10))}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent/10 text-accent">
                          {avg - (Math.floor(Math.random() * 10))}%
                          / 100
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {employee.notes}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewDetails(employee)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Employee Details</DialogTitle>
          </DialogHeader>
          {selectedEmployee && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">
                    Full Name
                  </h3>
                  <p className="text-base font-semibold">
                    {data.transformed.profile_data.name}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">
                    Email
                  </h3>
                  <p className="text-base">{data.transformed.profile_data.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">
                    Phone
                  </h3>
                  {/* <p className="text-base">{data.transformed.profile_data.phone}</p> */}
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">
                    Experience
                  </h3>
                  <p className="text-base">{data.transformed.profile_data.work_experience[0].job_title}</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  Education
                </h3>
                <p className="text-base">{data.transformed.profile_data.education[0].school}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  Skills
                </h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedEmployee.skills.split(", ").map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  Certifications
                </h3>
                <p className="text-base">{data.transformed.profile_data.skills[0]}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  Notable Projects
                </h3>
                <p className="text-base">{data.transformed.profile_data.projects}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  Languages
                </h3>
                <p className="text-base">{selectedEmployee.languages}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    6-Month Activity
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-muted rounded-full h-3">
                      <div
                        className="bg-accent h-3 rounded-full"
                        style={{ width: `${selectedEmployee.activity}%` }}
                      />
                    </div>
                    <div className="text-lg font-semibold">
                      {selectedEmployee.activity}%
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    Performance Score
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-accent">
                      {(Math.random() * 100)}
                    </span>
                    <span className="text-muted-foreground">/100</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  Notes
                </h3>
                <p className="text-base">{selectedEmployee.notes}</p>
              </div>

              <div className="flex gap-3 pt-4">
                <Button className="flex-1" onClick={handleSendMail}>
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email
                </Button>
                <Button
                  className="flex-1"
                  variant="outline"
                  onClick={handleScheduleMeeting}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Meeting
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Results;
