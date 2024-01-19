//Format is [[HTML section id string, officer object 1, officer object 2, ...], 
//           [HTML section id string, officer object 1, officer object 2, ...]]

const officers = [
  ["#officers",
  {
    name: "Lane Simmons",
    position: "President",
	  major_year: "COMP '25",
    socials: {
        linkedin: "https://www.linkedin.com/in/lcsimmons/",
        github: "https://github.com/lcsimmons",
        email: "tamucybersec@gmail.com",
        website: ""
    }
  },
  {
    name: "Colby Coppinger",
    position: "Vice President",
	  major_year: "GIST '25",
    socials: {
        email: "tamucybersec@gmail.com",
    }
  },
  {
    name: "Sophie Gleadell",
    position: "Secretary",
    major_year: "COMP '25",
    socials: {
        linkedin: "",
        github: "",
        email: "tamucybersec@gmail.com"
    }
  },
  {
    name: "Ezra Jeter",
    position: "Treasurer",
	  major_year: "CPEN '24",
    socials: {
        linkedin: "https://www.linkedin.com/in/ezrajeter",
        github: "",
        email: "tamucybersec@gmail.com",
        website: ""
    }
  },
  {
    name: "Emmie Teng",
    position: "Director of Public Relations",
	  major_year: "CPSC '25",
    socials: {
        linkedin: "https://www.linkedin.com/in/mengting-teng",
        github: "https://github.com/TengMengTing",
        email: "tamucybersec@gmail.com",
        website: ""
    }
  },
  {
    name: "Lasyasri Shilpi",
    position: "Director of External Relations",
	  major_year: "CPSC '24",
    socials: {
        email: "tamucybersec@gmail.com",
        website: ""
    }
  },
  {
    name: "Bode Raymond",
    position: "Competition Lead",
	  major_year: "COMP '25",
    socials: {
      //  linkedin: "https://www.linkedin.com/in/bode-raymond/",
       // github: "https://github.com/nhwn",
        email: "tamucybersec@gmail.com",
    }
  },
  {
    name: "Stella Yang",
    position: "Tech Lead",
	  major_year: "CPSC '25",
    socials: {
        github: "https://github.com/lilacstella",
        email: "tamucybersec@gmail.com",
    }
  },
  {
    name: "Victor Phan",
    position: "Interim Activity Groups Lead",
	  major_year: "CPSC '25",
    socials: {
        github: "https://github.com/move2slowly",
        email: "tamucybersec@gmail.com",
    }
  },
  {
    name: "Adriana Guerrero",
    position: "WiCyS President",
  	major_year: "TCMG '25",
    socials: {
        linkedin: "https://www.linkedin.com/in/adrianatamu/",
       // github: "https://github.com/erinlapko",
        email: "tamuwicys@gmail.com",
        website: ""
    }
  },
  {
    name: "Anna Slater",
    position: "WiCyS Vice President",
  	major_year: "CECN '23",
    socials: {
        linkedin: "https://www.linkedin.com/in/anna-slater/",
        github: "https://github.com/annaSlater",
        email: "tamuwicys@gmail.com",
        website: ""
    }
  },
  {
    name: "Martin Carlisle",
    position: "Faculty Advisor",
	  major_year: "CSCE Department",
    socials: {
        linkedin: "https://www.linkedin.com/in/martincarlisle/",
        github: "",
        email: "",
        website: "https://martincarlisle.com/"
    }
  }
  ]
]


const alumni = [
  {
    name: "Danny Hernandez",
    position: "Treasurer",
    gradYear: "Spring 2024",
    socials: {
      email: "danny2768@tamu.edu"
    }
  },
  {
    name: "Nathan Nguyen",
    position: "CTF Team Lead",
    gradYear: "Spring 2024",
    socials: {
      github: "https://github.com/nhwn"
    }
  },
  {
    name: "Jacob Kastenschmidt",
    position: "President",
    gradYear: "Spring 2023",
    socials: {
      linkedin: "https://www.linkedin.com/in/jkas/"
    }
  },
  {
    name: "Glenn Fitzpatrick",
    position: "Vice President",
    gradYear: "Spring 2023",
    socials: {
      linkedin: "https://www.linkedin.com/in/glennfitzpatrickgigem/",
      github: "https://github.com/RogueGuardian",
      website: ""
    }
  },
  {
    name: "Logan MacDonald",
    position: "Director of External Relations",
	  gradYear: "Fall 2023",
    socials: {
        linkedin: "https://www.linkedin.com/in/logan-macdonald-16591846/",
        github: "https://github.com/Logan-MacDonald",
        website: ""
    }
  }, 
  {
    name: "Matthew Le",
    position: "Competition Chair Member",
	  gradYear: "Spring 2023",
    socials: {
        linkedin: "https://www.linkedin.com/in/matthew-le-8395051b7/",
        github: "https://github.com/matthewle0xff",
        website: ""
    }
  },
  {
    name: "Liam Haber",
    position: "Competition Chair Member",
	  gradYear: "Spring 2023",
    socials: {
        github: "https://github.com/lhhaber",
    }
  },
  {
    name: "Rohan Viswanathan",
    position: "Competition Chair Member",
	  gradYear: "Spring 2023",
    socials: {
        linkedin: "https://www.linkedin.com/in/rohan-viswanathan/",
        github: "https://github.com/rohanvis24",
        website: ""
    }
  },
  {
    name: "Derek Viet",
    position: "Webmaster",
	  gradYear: "Spring 2023",
    socials: {
        linkedin: "https://www.linkedin.com/in/derek-viet/",
        github: "https://github.com/pyristix",
    }
  },
  {
    name: "Alyssa Kalish",
    position: "Director of Public Relations",
    gradYear: "Spring 2023",
    socials: {
        linkedin: "",
	github: "",
	website: ""
    }
  },
  {
    name: "Emily Murphy",
    position: "President",
    gradYear: "Spring 2022",
    socials: {
        linkedin: "https://www.linkedin.com/in/murphe22",
        github: "https://github.com/emurph1",
        website: "https://murphe22.com"
    }
  },
  {
    name: "Jonathan Saenz",
    position: "Vice President",
    gradYear: "Spring 2022",
    socials: {
        linkedin: "https://www.linkedin.com/in/jsaenz1",
        github: "https://github.com/saenzjonathan11",
        email: "",
        website: "https://jonathanfsaenz.com"
    }
  },
  {
    name: "Adele Walker",
    position: "WiCyS President",
    gradYear: "Spring 2022",
    socials: {
        linkedin: "https://www.linkedin.com/in/adele-w-a75ab7ba/",
        github: "",
        email: "",
        website: ""
    }
  },
  {
    name: "Weijia Yan",
    position: "WiCyS President",
    gradYear: "Fall 2021",
    socials: {
        linkedin: "https://www.linkedin.com/in/weijia-yan",
        github: "",
        email: "",
        website: ""
    }
  },
  {
    name: "Teddy Heinen",
    position: "CTF Team Lead",
    gradYear: "Fall 2021",
    socials: {
        linkedin: "https://www.linkedin.com/in/teddyheinen",
        github: "https://github.com/tsheinen",
        email: "",
        website: "https://teddyheinen.com"
    }
  },
  {
    name: "Matthew Spence",
    position: "President",
    gradYear: "Spring 2021",
    socials: {
        linkedin: "https://www.linkedin.com/in/matthew-s-4677aa128",
        github: "https://github.com/Matt-Spence/",
        email: "",
        website: ""
    }
  },
  {
    name: "Arjun Lalith",
    position: "Vice President",
    gradYear: "Spring 2021",
    socials: {
        linkedin: "https://www.linkedin.com/in/alalith",
        github: "https://github.com/alalith/",
        email: "",
        website: "https://arjunlalith.com"
    }
  },
  {
    name: "Madeleine Phillips",
    position: "WiCyS President",
    gradYear: "Spring 2021",
    socials: {
        linkedin: "https://www.linkedin.com/in/madeleinephillips848676",
        github: "https://github.com/phillips848676",
        email: "",
        website: ""
    }
  },
  {
    name: "John Zenick",
    position: "President",
    gradYear: "Spring 2020",
    socials: {
        linkedin: "",
        github: "",
        email: "",
        website: ""
    }
  },
  {
    name: "Nick March",
    position: "Vice President",
    gradYear: "Spring 2020",
    socials: {
        linkedin: "https://www.linkedin.com/in/nick-march-20103b11a",
        github: "",
        email: "",
        website: ""
    }
  },
  {
    name: "Jonathan Alverson",
    position: "General Officer",
    gradYear: "Spring 2020",
    socials: {
        linkedin: "",
        github: "",
        email: "",
        website: ""
    }
  }
]
