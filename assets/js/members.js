//Format is [[HTML section id string, officer object 1, officer object 2, ...], 
//           [HTML section id string, officer object 1, officer object 2, ...]]

const officers = [
  ["#officers",
  {
    name: "Jacob Kastenschmidt",
    position: "President",
	  major_year: "MISY '23",
    image: "assets/img/officers/formatted/jacob.jpg",
    socials: {
        linkedin: "https://www.linkedin.com/in/jkas/",
        github: "",
        email: "tamucybersec@gmail.com",
        website: ""
    }
  },
  {
    name: "Glenn Fitzpatrick",
    position: "Vice President",
	  major_year: "CPSC '23",
    image: "assets/img/officers/formatted/glenn.jpg",
    socials: {
        linkedin: "https://www.linkedin.com/in/glennfitzpatrickgigem/",
        github: "https://github.com/RogueGuardian",
        email: "tamucybersec@gmail.com",
        website: ""
    }
  },
  {
    name: "Anna Slater",
    position: "WiCyS President",
  	major_year: "CECN '23",
    image: "assets/img/officers/formatted/anna.png",
    socials: {
        linkedin: "",
        github: "",
        email: "tamuwicys@gmail.com",
        website: ""
    }
  },
  {
    name: "Lane Simmons",
    position: "Secretary",
	  major_year: "ENGR '25",
    image: "assets/img/officers/formatted/lane.jpg",
    socials: {
        linkedin: "https://www.linkedin.com/in/lcsimmons/",
        github: "https://github.com/lcsimmons",
        email: "tamucybersec@gmail.com",
        website: ""
    }
  },
  {
    name: "Danny Hernandez",
    position: "Treasurer",
	  major_year: "TCMG '24",
    image: "assets/img/officers/formatted/danny.jpg",
    socials: {
        linkedin: "https://www.linkedin.com/in/dhernandez24",
        github: "",
        email: "tamucybersec@gmail.com",
        website: ""
    }
  },
  {
    name: "Emmie Teng",
    position: "Director of Public Relations",
	  major_year: "ENGR '25",
    image: "assets/img/officers/formatted/emmie.jpg",
    socials: {
        linkedin: "https://www.linkedin.com/in/mengting-teng",
        github: "",
        email: "tamucybersec@gmail.com",
        website: ""
    }
  },
  {
    name: "Logan MacDonald",
    position: "Director of External Relations",
	  major_year: "TCMG '23",
    image: "assets/img/officers/formatted/logan.jpg",
    socials: {
        linkedin: "https://www.linkedin.com/in/logan-macdonald-16591846/",
        github: "https://github.com/Logan-MacDonald",
        email: "tamucybersec@gmail.com",
        website: ""
    }
  }, 
  {
    name: "Nathan Nguyen",
    position: "CTF Team Lead",
	  major_year: "CPSC + APMS '24",
    image: "assets/img/officers/formatted/nathan.jpg",
    socials: {
        linkedin: "https://www.linkedin.com/in/nathan-tm-nguyen/",
        github: "https://github.com/nhwn",
        email: "tamucybersec@gmail.com",
        website: ""
    }
  },
  {
    name: "Jack Roehr",
    position: "CCDC Team Lead",
	  major_year: "ECON + CPSC '24",
    image: "assets/img/officers/formatted/jack.jpg",
    socials: {
        linkedin: "https://www.linkedin.com/in/jroehr",
        github: "https://github.com/bin",
        email: "tamucybersec@gmail.com",
        website: "https://roe.hr",
        website_2: "https://seatgull.com"
    }
  },
  {
    name: "Matthew Le",
    position: "Competition Chair Member",
	  major_year: "CPSC '23",
    image: "assets/img/officers/formatted/matthew.jpg",
    socials: {
        linkedin: "https://www.linkedin.com/in/matthew-le-8395051b7/",
        github: "https://github.com/matthewle0xff",
        email: "tamucybersec@gmail.com",
        website: ""
    }
  },
  {
    name: "Liam Haber",
    position: "Competition Chair Member",
	  major_year: "CPSC '23",
    image: "assets/img/officers/formatted/liam.jpg",
    socials: {
        linkedin: "",
        github: "",
        email: "tamucybersec@gmail.com",
        website: ""
    }
  },
  {
    name: "Rohan Viswanathan",
    position: "Competition Chair Member",
	  major_year: "CPSC '23",
    image: "assets/img/officers/formatted/rohan.jpg",
    socials: {
        linkedin: "https://www.linkedin.com/in/rohan-viswanathan/",
        github: "https://github.com/rohanvis24",
        email: "tamucybersec@gmail.com",
        website: ""
    }
  },
  {
    name: "Derek Viet",
    position: "Webmaster",
	  major_year: "CECN '23",
    image: "assets/img/officers/formatted/derek.jpg",
    socials: {
        linkedin: "https://www.linkedin.com/in/derek-viet/",
        github: "https://github.com/pyristix",
        email: "tamucybersec@gmail.com",
        website: ""
    }
  },
  {
    name: "Martin Carlisle",
    position: "Faculty Advisor",
	  major_year: "CSCE Department",
    image: "assets/img/officers/formatted/martin-carlisle.jpg",
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
    name: "Emily Murphy",
    position: "President",
    gradYear: "Spring 2022",
    socials: {
        linkedin: "https://www.linkedin.com/in/murphe22",
        github: "https://github.com/emurph1",
        email: "",
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
        github: "https://github.com/tcheinen",
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