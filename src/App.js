import React,{useState,useEffect} from "react";
import Layout from "./components/layout";
import "./App.css";
import Title from './components/title';
import Subtitle from './components/subtitle';
import Work from './components/work';
import Skills from './components/skills';
import Social from './components/social';
import Loader from './components/loader';
import Markdown from './components/markdown';
import MarkdownPreview from './components/markdownPreview';
import gsap from "gsap";
import{ArrowLeftIcon,CopyIcon,DownloadIcon,EyeIcon,CheckIcon,MarkdownIcon,FileCodeIcon} from '@primer/octicons-react'
import { initialSkillState } from './constants/skills';
import { DEFAULT_PREFIX, DEFAULT_DATA, DEFAULT_LINK, DEFAULT_SOCIAL } from './constants/defaults';
import { isGitHubUsernameValid, isMediumUsernameValid, isTwitterUsernameValid } from './utils/validation';
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

  const handleBackToEdit = () => {
    setGeneratePreview(false);
    setGenerateMarkdown(false);
    setShowConfig(true);
    gsap.set('#form', {
      display: '',
    });
    gsap.to('.generate', {
      scale: 1,
    });
  };

  const handleDownloadMarkdown = () => {
    const markdownContent = document.getElementById('markdown-content');
    const tempElement = document.createElement('a');
    tempElement.setAttribute(
      'href',
      `data:text/markdown;charset=utf-8,${encodeURIComponent(markdownContent.innerText)}`,
    );
    tempElement.setAttribute('download', 'README.md');
    tempElement.style.display = 'none';
    document.body.appendChild(tempElement);
    tempElement.click();
    document.body.removeChild(tempElement);
  };

  const handleCopyToClipboard = () => {
    const range = document.createRange();
    range.selectNode(document.getElementById('markdown-content'));
    window.getSelection().removeAllRanges(); // clear current selection
    window.getSelection().addRange(range); // to select text
    document.execCommand('copy');
    window.getSelection().removeAllRanges();

    setCopyMarkdownButton();
  };

  const setCopyMarkdownButton = () => {
    const el = document.getElementById('copy-markdown');
    if (el) {
      gsap.set('#copy-markdown', {
        color: '#00471b',
      });
    }
    gsap.fromTo(
      '#copy-button',
      {
        scale: 0.5,
      },
      {
        scale: 1,
        ease: 'elastic.in',
        border: '2px solid #00471b',
        duration: 0.5,
      },
    );
    setcopyObj({
      isCopied: true,
      copiedText: 'copied',
    });
  };

  const handleGeneratePreview = () => {
    setGenerateMarkdown(!generateMarkdown);
    setGeneratePreview(!generatePreview);
    if (!generatePreview) {
      gsap.set('#copy-button, #download-md-button, #download-json-button', {
        visibility: 'hidden',
      });
      setPreviewMarkdown({
        isPreview: true,
        buttonText: 'markdown',
      });
    } else {
      gsap.set('#copy-button, #download-md-button, #download-json-button', {
        visibility: 'visible',
      });
      gsap.to('#copy-button', {
        border: '2px solid #3b3b4f',
        duration: 1,
      });
      setPreviewMarkdown({
        isPreview: false,
        buttonText: 'preview',
      });
      resetCopyMarkdownButton();
    }
  };
  const resetCopyMarkdownButton = () => {
    const el = document.getElementById('copy-markdown');
    if (el) {
      gsap.set('#copy-markdown', {
        color: '#0a0a23',
      });
    }
    setcopyObj({
      isCopied: false,
      copiedText: 'copy-markdown',
    });
  };

  const handleDownloadJson = () => {
    const tempElement = document.createElement('a');
    tempElement.setAttribute(
      'href',
      `data:text/json;charset=utf-8,${encodeURIComponent(
        JSON.stringify({ prefix, data, link, social, skills }),
      )}`,
    );
    tempElement.setAttribute('download', 'data.json');
    tempElement.style.display = 'none';
    document.body.appendChild(tempElement);
    tempElement.click();
    document.body.removeChild(tempElement);
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
        {displayLoader ? <Loader /> : ''}
        {generateMarkdown || generatePreview ? (
          <div className="markdown-section p-4 sm:py-4 sm:px-10">
            <div className="w-full flex justify-between items-center">
              <button
                type="button"
                className="text-base w-1/6 border-2 border-solid border-gray-900 bg-gray-100 flex items-center justify-center p-1"
                onClick={handleBackToEdit}
              >
                <ArrowLeftIcon size={24} />
                <span className="hidden sm:block"> back to edit</span>
              </button>

              <button
                type="button"
                className="text-base w-1/6 border-2 border-solid border-gray-900 bg-gray-100 flex items-center justify-center p-1"
                id="copy-button"
                onClick={handleCopyToClipboard}
              >
                {copyObj.isCopied === true ? <CheckIcon size={24} /> : <CopyIcon size={24} />}
                <span className="hidden sm:block" id="copy-markdown">
                  {copyObj.copiedText}
                </span>
              </button>

              <button
                type="button"
                className="text-base w-1/6 border-2 border-solid border-gray-900 bg-gray-100 flex items-center justify-center p-1"
                id="download-md-button"
                onClick={handleDownloadMarkdown}
              >
                <DownloadIcon size={24} />
                <span className="hidden sm:block" id="download-markdown">
                  download markdown
                </span>
              </button>

              <button
                type="button"
                className="text-base w-1/6 border-2 border-solid border-gray-900 bg-gray-100 flex items-center justify-center p-1"
                id="download-json-button"
                onClick={handleDownloadJson}
              >
                <FileCodeIcon size={24} />
                <span className="hidden sm:block" id="download-json">
                  download backup
                </span>
              </button>

              <button
                type="button"
                className="text-base w-1/6 border-2 border-solid border-gray-900 bg-gray-100 flex items-center justify-center p-1"
                onClick={handleGeneratePreview}
              >
                {previewMarkdown.isPreview ? <MarkdownIcon size={16} /> : <EyeIcon size={16} />}
                <span className="hidden sm:block ml-1" id="preview-markdown">
                  {previewMarkdown.buttonText}
                </span>
              </button>
            </div>
            <div className="section">
            {(data.visitorsBadge ||
              data.githubProfileTrophy ||
              data.githubStats ||
              data.topLanguages ||
              data.streakStats) &&
            !social.github ? (
              <div className="warning">* Please add github username to use these add-ons</div>
            ) : (
              ''
            )}
            {social.github && !isGitHubUsernameValid(social.github) ? (
              <div className="warning">* GitHub username is invalid, please add a valid username</div>
            ) : (
              ''
            )}
            {social.medium && !isMediumUsernameValid(social.medium) ? (
              <div className="warning">* Medium username is invalid, please add a valid username (with @)</div>
            ) : (
              ''
            )}
            {data.mediumDynamicBlogs && !social.medium ? (
              <div className="warning">* Please add medium username to display latest blogs dynamically</div>
            ) : (
              ''
            )}
            {data.devDynamicBlogs && !social.dev ? (
              <div className="warning">* Please add dev.to username to display latest blogs dynamically</div>
            ) : (
              ''
            )}
            {data.rssDynamicBlogs && !social.rssurl ? (
              <div className="warning">
                * Please add your rss feed url to display latest blogs dynamically from your personal blog
              </div>
            ) : (
              ''
            )}
            {data.twitterBadge && !social.twitter ? (
              <div className="warning">* Please add twitter username to use these add-ons</div>
            ) : (
              ''
            )}
            {social.twitter && !isTwitterUsernameValid(social.twitter) ? (
              <div className="warning">* Twitter username is invalid, please add a valid username</div>
            ) : (
              ''
            )}
          </div>
            <div className="w-full flex justify-center items-center">
              <div
                className="w-full text-sm text-gray-900 shadow-xl mt-2 p-4 bg-gray-100 border-2 border-solid border-gray-800"
                id="markdown-box"
              >
                {generatePreview ? (
                  <MarkdownPreview
                    prefix={prefix}
                    data={data}
                    link={link}
                    social={social}
                    skills={skills}
                  />
                ) : (
                  ''
                )}
                {generateMarkdown ? (
                  <Markdown prefix={prefix} data={data} link={link} social={social} skills={skills} />
                ) : (
                  ''
                )}
              </div>
            </div>
            <div className="mt-10" id="support">
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </Layout>
  );
}

export default App;
