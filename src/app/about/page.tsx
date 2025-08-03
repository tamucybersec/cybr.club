import AboutLanding from "../../components/AboutLanding"
import AboutMission from "../../components/AboutMission"
import NavBar from "../../components/NavBar"
import AboutChunk from "../../components/AboutChunk"
import Leadership from "../../components/Leadership"
import Sponsorship from "../../components/AboutSponsorship"
import Footer from "../../components/Footer"

export default function AboutPage() {
  return (
    <>
      <NavBar />
      <AboutLanding />
      <AboutMission />
      <AboutChunk />
      <Leadership />
      <Sponsorship />
    
      <div className="h-32"></div>
      <Footer />
    </>
  )
}
