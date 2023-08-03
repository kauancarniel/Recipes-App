/* eslint-disable max-len */
import React from 'react';
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';
import Header from '../components/Header';
import lucasIMG from '../images/lucas.jpeg';
import guilhermeIMG from '../images/guilherme.jpeg';
import './About.css';

function About() {
  const hosts = [
    {
      name: 'Guilherme Fernandes',
      github: '',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt quis rem eum totam fuga, ut soluta vel accusantium explicabo eius fugiat necessitatibus sed molestiae animi officiis quos! Nemo, quae in?',
      linkedin: '',
      image: guilhermeIMG,
    },
    {
      name: 'Kauan',
      github: '',
      description: 'Lorng elit. Incidunt quis rem eum totam fuga, ut soluta vel accusantium ficiis quos! Nemo, quae in?',
      linkedin: '',
      image: lucasIMG,
    },
    {
      name: 'Lucas Diello',
      github: 'https://github.com/LucasDiello',
      description: 'Sempre admirei a tecnologia, pois vivenciei minha infância e minha adolescência em frente a um computador, sou obcecado por desafios e hoje estou aprendendo sobre o mundo do desenvolvimento web, caso interesse entre em contato! 🚀',
      linkedin: 'https://www.linkedin.com/in/lucas-diello-5b5440265/',
      image: lucasIMG,
    },
  ];

  return (
    <>
      <Header title="About" />
      <main
        className="recipe-box
       flex bg-form glass box-bottom gap-3 p-10 flex-wrap justify-center"
      >
        <section className="p-2">
          <h1 className="md:text-start text-center text-white">Title</h1>
          <p className="text-[var(--gray)]">
            Lorem ipsum dolor sit amet consectetur adipisicing eli
            . Incidunt quis rem eum totam fuga, ut soluta v
            el accusantium explicabo eius fugiat
            necessitatibus sed molestiae animi officiis quos!
            Nemo, quae in?Lorem ipsum dolor,
            sit amet
            consectetur adipisicin
            g elit. Quam maxime repudiandae, cum ut nesciun
            t, quisquam ex tempora voluptatem
            nostrum quo assumenda veritatis eos laudantium laborum,
            eaque officiis blanditiis
            minus tene
            tur! Lorem i
            psum dolor sit, amet consectetur adipisic
            ing elit. Dolorum corrupti odit min
            ima atque commod
            i magnam eos harum, voluptates officia provident quis
            unde voluptatibus voluptas! T
            empore culpa sequi consequuntur necessitatibus aperiam?
          </p>
        </section>
        <div className="w-[100%] p-2">
          <h2 className="text-white md:text-start text-center ">Desenvolvedores</h2>
        </div>
        <div className="flex flex-wrap justify-center">
          {hosts.map((host, index) => (
            <div className="p-2 mr-2 " key={ index }>
              <div className="image-container">
                <img
                  className="border-div w-[280px] h-[340px] image-about"
                  src={ host.image }
                  alt="img-hosts"
                />
                <div className="text-about">
                  <div className="flex justify-between mb-2">
                    <h5 className="text-[var(--gray)] mr-2">{host.name}</h5>
                    <div>
                      {host.linkedin && (
                        <a href={ host.linkedin } target="_blank" rel="noreferrer">
                          <AiFillLinkedin size={ 25 } className="text-[var(--orange)] " />
                        </a>
                      )}
                      {host.github && (
                        <a href={ host.github } target="_blank" rel="noreferrer">
                          <AiFillGithub size={ 25 } className="text-[var(--orange)] " />
                        </a>
                      )}
                    </div>
                  </div>
                  <p>{host.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export default About;
