import React,{useState,useEffect} from "react";
import Layout from "./components/layout";
import "./App.css";
import Title from './components/title';
import Subtitle from './components/subtitle';
import Work from './components/work';
import Skills from './components/skills';
import Social from './components/social';
import gsap from "gsap";
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
  const [social,setSocial]= useState(DEFAULT_SOCIAL);

  const [restore, setRestore] = useState('');
  const [generatePreview, setGeneratePreview] = useState(false);
  const [generateMarkdown, setGenerateMarkdown] = useState(false);
  const [displayLoader, setDisplayLoader] = useState(false);
  const [showConfig, setShowConfig] = useState(true);
  const [copyObj, setcopyObj] = useState({
    isCopied: false,
    copiedText: 'copy-markdown',
  });
  const [previewMarkdown, setPreviewMarkdown] = useState({
    isPreview: false,
    buttonText: 'preview',
  });
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
  const handleSocialChange=(field, e)=>{
    const change={...social};
    change[field]=field==='discord'? e.target.value : e.target.value.toLowerCase();
    setSocial(change);
  }; 

  const generate = () => {
    setShowConfig(false);
    const tl = gsap.timeline();
    tl.to('.generate', {
      scale: 0,
      duration: 0.5,
      ease: 'Linear.easeNone',
    });
    tl.set('#form', { display: 'none' });
    setDisplayLoader(true);
    setTimeout(() => {
      setDisplayLoader(false);
      setGenerateMarkdown(!generateMarkdown);
      gsap.fromTo(
        '#markdown-box',
        {
          scale: 0.2,
        },
        {
          scale: 1,
          duration: 0.5,
          ease: 'Linear.easeNone',
        },
      );
      gsap.fromTo(
        '#support',
        {
          autoAlpha: 0,
        },
        {
          autoAlpha: 1,
          duration: 2,
          ease: 'Linear.easeNone',
        },
      );
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }, 3000);
  };
  const handleGenerate = () => {
    // trimDataValues(data, setData);
    // trimDataValues(social, setSocial);
    // trimDataValues(link, setLink);
    // resetCopyMarkdownButton();
    // if (data.visitorsBadge || data.githubProfileTrophy || data.githubStats || data.topLanguages || data.streakStats) {
    //   if (social.github && isGitHubUsernameValid(social.github)) {
    //     generate();
    //   }
    // } else if (data.twitterBadge) {
    //   if (social.twitter && isTwitterUsernameValid(social.twitter)) {
    //     generate();
    //   }
    // } else if (social.github) {
    //   if (isGitHubUsernameValid(social.github)) {
    //     generate();
    //   }
    // } else {
    //   generate();
    // }
    generate();
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
          <Social social={social} handleSocialChange={handleSocialChange}/>

          <div className="flex items-center justify-center w-full">
            <div
              className="text-xs sm:text-xl font-medium border-2 border-solid border-gray-900 bg-gray-100 flex items-center justify-center py-1 sm:py-2 px-2 sm:px-4 generate"
              tabIndex="0"
              role="button"
              onClick={handleGenerate}
              onKeyDown={(e) => e.keyCode === 13 && handleGenerate()}
            >
              Generate README
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default App;
