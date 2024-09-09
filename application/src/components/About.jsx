import Image from "react-bootstrap/Image";
import React, { useState } from "react";
import ReposList from "./ReposList";

function About() {
  const [username, setUsername] = useState("");
  const [repos, setRepos] = useState([]);

  const fetchRepos = async () => {
    try {
      const response = await fetch(
        `https://api.github.com/users/spajicdominik/repos`
      );
      const data = await response.json();
      setRepos(data);
    } catch (error) {
      console.error("Error fetching repos:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchRepos();
  };

  return (
    <div>
        <div className="container">
            <h1 className="mt-5 mb-5">O developeru</h1>
        </div>
      <div className="container mt-5 mb-3">
        <div className="row">
          <div className="col-md-6 col-12 mb-4">
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWYFKwoId92pkkHcCnGpY4erDh9Cth11-yxg&s"
              thumbnail
            />
          </div>
          <div className="col-md-6 col-12">
            <p>
              Zovem se Dominik Spajić i rođen sam 30.07.2001. u Osijeku.
              Obrazovanje sam započeo u Osnovnoj školi "Vladimir Nazor" Čepin, a
              zatim sam završio III. Gimnaziju u Osijeku 2020. godine. Te iste
              godine upisujem prijediplomski sveučilišni studij Matematike i
              računarstva na Fakultetu primijenjene matematike i informatike
              Sveučilišta J.J. Strossmayera u Osijeku (tada naziva Odjel za
              matematiku). Tečno govorim engleski jezik, obzirom da sam imao
              izvrsne ocjene u osnovnoj i srednjoj školi. Od dodatnog
              obrazovanja završio sam Osnovnu glazbenu školu Franje Kuhača u
              Osijeku, modul klavir, 2016. godine. Također sam predstavljao grad
              Osijek na najvišem rangu natjecanja u državi i Europi kroz rukomet
              i atletiku.
            </p>
          </div>
        </div>
      </div>

      <hr style={{ border: '1px solid #000' }} />


      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 col-12">
            <ReposList repos={repos} />
          </div>
          <div className="col-md-6 col-12">
            <h3>GitHub korisnički repozitorij</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Unesite GitHub korisničko ime"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <button type="submit">Pretraži</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
