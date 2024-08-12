import React,{useState,useEffect} from "react";
import Layout from "./components/layout";
import "./App.css";
import Title from './components/title';
import Subtitle from './components/subtitle';
import Work from './components/work';
import Skills from './components/skills';
import { initialSkillState } from './constants/skills';
import { DEFAULT_PREFIX, DEFAULT_DATA, DEFAULT_LINK, DEFAULT_SOCIAL, DEFAULT_SUPPORT } from './constants/defaults';
function App() {

  const KeepCacheUpdated = ({ prefix, data, link, social, skills, support }) => {
    useEffect(() => {
      localStorage.setItem(
        'cache',
        JSON.stringify({
          prefix,
          data,
          link,
          social,
          skills,
          support,
        }),
      );
    }, [prefix, data, link, social, skills, support]);
  };
  const DEFAULT_SKILLS = initialSkillState;
  const [prefix, setPrefix] = useState(DEFAULT_PREFIX);
  const [data, setData] = useState(DEFAULT_DATA);
  const [link, setLink] = useState(DEFAULT_LINK);
  const [skills, setSkills] = useState(DEFAULT_SKILLS);


  const handlePrefixChange = (field, e) => {
    const change = { ...prefix };
    change[field] = e.target.value;
    setPrefix(change);
  };

  const handleDataChange = (field, e) => {
    const change = { ...data };
    change[field] = e.target.value;
    setData(change);
  };

  const handleLinkChange = (field, e) => {
    const change = { ...link };
    change[field] = e.target.value;
    setLink(change);
  };
  const handleSkillsChange = (field) => {
    const change = { ...skills };
    change[field] = !change[field];
    setSkills(change);
  };

  return (
    <Layout>
      <div className="m-4 sm:p-4">
        <div id="form">
          <Title
            data={data}
            prefix={prefix}
            handleDataChange={handleDataChange}
            handlePrefixChange={handlePrefixChange}
          />

          <Subtitle data={data} handleDataChange={handleDataChange} />
          <Work
            prefix={prefix}
            data={data}
            link={link}
            handlePrefixChange={handlePrefixChange}
            handleLinkChange={handleLinkChange}
            handleDataChange={handleDataChange}
          />
          <Skills skills={skills} handleSkillsChange={handleSkillsChange} />
        </div>
      </div>
    </Layout>
  );
}

export default App;
