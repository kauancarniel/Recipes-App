/* eslint-disable react/jsx-max-depth */
import React from 'react';
import PropTypes from 'prop-types';
import { AiFillGithub, AiFillLinkedin, AiOutlineLaptop } from 'react-icons/ai';

function Host({ name, github, description, linkedin, image, port }) {
  return (
    <div className="p-2">
      <div className="image-container">
        <img
          className="border-div w-[300px] h-[340px] image-about"
          src={ image }
          alt="img-hosts"
        />
        <div className="text-about">
          <div className="flex justify-between">
            <div className="flex w-full justify-between items-center mb-2">
              <h5 className="text-[var(--orange)] m-0">{name}</h5>
              <div className={ port && 'flex gap-[2px]' }>
                {linkedin && (
                  <a href={ linkedin } target="_blank" rel="noreferrer">
                    <AiFillLinkedin size={ 25 } className="text-[var(--orange)]" />
                  </a>
                )}
                {github && (
                  <a href={ github } target="_blank" rel="noreferrer">
                    <AiFillGithub size={ 25 } className="text-[var(--orange)]" />
                  </a>
                )}
                {
                  port && (
                    <a href={ port } target="_blank" rel="noreferrer">
                      <AiOutlineLaptop size={ 25 } className="text-[var(--orange)]" />
                    </a>
                  )
                }
              </div>
            </div>
          </div>
          <p className="text-sm m-0">{description}</p>
        </div>
      </div>
    </div>
  );
}

Host.propTypes = {
  name: PropTypes.string.isRequired,
  github: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  linkedin: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  port: PropTypes.string.isRequired,
};

export default Host;
