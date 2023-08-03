import React from 'react';
import Header from '../components/Header';
import Host from '../components/Host';
import lucasIMG from '../images/lucas.jpeg';
import guilhermeIMG from '../images/guilherme.jpeg';
import './About.css';

function About() {
  const hosts = [
    {
      name: 'Guilherme Fernandes',
      github: '',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt quis rem eum totam fuga, ut soluta vel accusantium explicabo eius fugiat necessitatibus sed molestiae animi officiis quos! Nemo, quae in?',
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
      description:
        'Sempre admirei a tecnologia, pois vivenciei minha infância e minha adolescência em frente a um computador, sou obcecado por desafios e hoje estou aprendendo sobre o mundo do desenvolvimento web, caso interesse entre em contato!  🚀',
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
          <h1 className="text-start text-white mb-6">Aplicação</h1>
          <p className="text-[var(--gray)]">
            Lorem ipsum dolor
            sit amet consectetur adipisicing elit.
            Odio, mollitia! Inventore quae ab recusandae lau
            dantium, temporibus dicta quibusdam nulla labore o
            dio aut odit in. Ex voluptatem quis adipisci enim quidem.
            Lorem ipsum dolor sit amet consectetur a
            ipisicing elit. Explicabo consequatur non deserunt i
            psa nihil cupiditate optio ab id animi distinctio, velit
            laboriosam ipsum fugit quia placeat ullam provident earum consectet
            ur!
            Lorem ipsum, dolor sit amet consectetur adipisicing eli
            t. Architecto hic quod, voluptas accusantium beatae conseq
            uuntur nam nostrum debitis magni sed, iure consectetur?
            Repudiandae optio distinctio facilis aut numquam maxime amet?
          </p>
        </section>
        <div className="w-[100%] p-2">
          <h2 className="text-white md:text-start text-center">Desenvolvedores</h2>
        </div>
        <div className="flex flex-wrap justify-center">
          {hosts.map((host, index) => (
            <Host key={ index } { ...host } />
          ))}
        </div>
      </main>
    </>
  );
}

export default About;
