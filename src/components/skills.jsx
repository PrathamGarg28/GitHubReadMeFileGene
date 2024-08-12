import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { SearchIcon, XIcon, ChevronDownIcon, ChevronUpIcon } from '@primer/octicons-react';
import { icons, categorizedSkills } from '../constants/skills';

const Skills = ({ skills, handleSkillsChange }) => {
  const [search, setSearch] = useState('');
  const [expandedCategories, setExpandedCategories] = useState({});
  const inputRef = useRef();

  // Initialize all categories as expanded on component mount
  React.useEffect(() => {
    const initialExpandedState = Object.keys(categorizedSkills).reduce((acc, key) => {
      acc[key] = false;
      return acc;
    }, {});
    setExpandedCategories(initialExpandedState);
  }, []);

  const toggleCategory = (categoryKey) => {
    setExpandedCategories((prevState) => ({
      ...prevState,
      [categoryKey]: !prevState[categoryKey],
    }));
  };

  const filteredCategories = Object.keys(categorizedSkills).filter((key) => {
    const filtered = categorizedSkills[key].skills.filter((skill) =>
      skill.toLowerCase().includes(search.toLowerCase())
    );
    return filtered.length !== 0;
  });

  const createSkill = (skill) => (
    <div className="w-1/3 sm:w-1/4 my-6" key={skill}>
      <label htmlFor={skill} className="checkbox-label flex items-center justify-start">
        <input
          id={skill}
          type="checkbox"
          className="checkbox-label__input"
          checked={skills[skill]}
          onChange={() => handleSkillsChange(skill)}
        />
        <span className="checkbox-label__control" />
        <img className="ml-4 w-8 h-8 sm:w-10 sm:h-10" src={icons[skill]} alt={skill} />
        <span className="tooltiptext">{skill}</span>
      </label>
    </div>
  );

  return (
    <div className="px-2 sm:px-6 mb-10">
      <div className="text-xl sm:text-2xl font-bold font-title mt-2 mb-4 flex justify-between items-center">
        Skills
        <div className="relative flex">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="leading:none text-xs my-0 py-1 px-2 pr-8 sm:text-xl border-2 border-gray-900 focus:border-blue-700 placeholder-gray-700"
            placeholder="Search Skills"
            ref={inputRef}
          />
          <span className="absolute right-2 top-1/2 transform -translate-y-1/2">
            {search !== '' ? (
              <button
                type="button"
                className="focus:outline-none"
                onClick={() => {
                  setSearch('');
                  inputRef.current.value = '';
                }}
              >
                <XIcon size={16} className="mb-1 transform scale-100 md:scale-125" />
              </button>
            ) : (
              <SearchIcon size={16} className="mb-1 transform scale-100 md:scale-125" />
            )}
          </span>
        </div>
      </div>

      {filteredCategories.map((key) => {
        const filteredSkills = categorizedSkills[key].skills.filter((skill) =>
          skill.toLowerCase().includes(search.toLowerCase())
        );
        const isExpanded = expandedCategories[key];

        return (
          <div key={key} className="mb-4">
            <div
              className="flex justify-between items-center cursor-pointer bg-gray-200 px-4 py-2 rounded"
              onClick={() => toggleCategory(key)}
            >
              <span className="text-sm sm:text-xl text-gray-900">{categorizedSkills[key].title}</span>
              {isExpanded ? <ChevronUpIcon size={24} /> : <ChevronDownIcon size={24} />}
            </div>
            {isExpanded && (
              <div className="flex justify-start items-center flex-wrap w-full pl-4 sm:pl-10">
                {filteredSkills.map((skill) => createSkill(skill))}
              </div>
            )}
          </div>
        );
      })}

      {filteredCategories.length === 0 && (
        <span className="flex justify-center text-gray-900">No Results Found</span>
      )}
    </div>
  );
};

Skills.propTypes = {
  skills: PropTypes.object.isRequired,
  handleSkillsChange: PropTypes.func.isRequired,
};

export default Skills;
