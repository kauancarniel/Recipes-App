/* eslint-disable max-len */
import React from 'react';
import Header from '../components/Header';
import Host from '../components/Host';
import lucasIMG from '../images/lucas.jpeg';
import guilhermeIMG from '../images/guilherme.jpeg';
import kauanImg from '../images/kauan.jpeg';
import './About.css';

function About() {
  const hosts = [
    {
      name: 'Guilherme Fernandes',
      github: 'https://github.com/GuiiFernandes',
      description:
        'Desenvolvedor FullStack e Summer de Instrução FrontEnd pela Trybe. Além de gestor financeiro pelo IFMG-Formiga e sócio e gestor do Sweet Pet - Estética Animal. 31 anos e moro em Lavras-MG. Sou obcecado por melhorar a vida das pessoas. por meio da tecnologia Faminto por conhecimento, além da tecnologia, interesso em negócios, processos, economia, finanças e investimentos. Busco criar soluções que permitam às pessoas terem mais tempo para desfrutar de uma vida plena e gratificante. Acredito que a tecnologia pode ajudar a gerar renda e liberar tempo valioso, para que todos possam viver plenamente e aproveitar as coisas que mais importam.',
      linkedin: 'https://www.linkedin.com/in/guifernandesdev/',
      port: 'https://guiifernandes.github.io/',
      image: guilhermeIMG,
    },
    {
      name: 'Kauan Carniel Peres',
      github: 'https://github.com/kauancarniel',
      description: 'Tenho 20 anos, sou estudante de desenvolvimento web pela Trybe e apaixonado por tecnologia, gosto muito de aprender e colocar minhas habilidades em prática, sou adepto a metodologias ágeis e estou disponível para uma conversa.',
      linkedin: 'https://www.linkedin.com/in/kauancarniel/',
      image: kauanImg,
    },
    {
      name: 'Lucas Diello',
      github: 'https://github.com/LucasDiello',
      description:
        'Olá, tenho 21 anos e sempre admirei a tecnologia, pois vivenciei minha infância e minha adolescência em frente a um computador, sou obcecado por desafios e hoje estou aprendendo sobre o mundo do desenvolvimento web, caso interesse entre em contato!  🚀',
      linkedin: 'https://www.linkedin.com/in/lucas-diello-5b5440265/',
      port: 'https://lucasdiello.netlify.app/',
      image: lucasIMG,
    },
  ];

  return (
    <>
      <Header title="About" />
      <main
        className="recipe-box
      flex bg-form glass box-bottom gap-3 p-10 flex-wrap justify-center
      "
      >
        <section className="p-2">
          <h1 className="text-start text-white mb-6">Aplicação</h1>
          <p className="text-[var(--gray)]">
            O app de receitas foi projetado para simplificar sua vida na cozinha,
            oferecendo uma plataforma intuitiva e abrangente para todas as suas necessidades culinárias.
            Desde o início, nosso projeto tinha apenas um propósito simples:
            simplificar a culinária e inspirar os amantes da comida.
            No entanto, à medida que trabalhávamos no projeto, descobrimos que poderíamos
            criar algo além. O que começou como uma ideia singular evoluiu para uma
            comunidade dinâmica e interativa. Ao longo do projeto, era essencial permitir
            que os usuários participassem ativamente. Não queríamos apenas fornecer
            receitas e dicas, queríamos criar um espaço onde todos pudessem contribuir,
            aprender e crescer juntos. Em resumo,
            nosso aplicativo de receitas é mais do que uma simples coleção de instruções
            culinárias. É uma janela para apreciadores da gastronomia, uma escola de técnicas e
            um ponto de encontro para amantes da comida.
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
