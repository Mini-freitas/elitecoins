import styled from "styled-components";

// Container do Slider
export const SliderContainer = styled.div`
  grid-area: slider;
  background-color: var(--cor-slider);
  position: relative;
  margin: 0 auto;
  overflow: hidden;

  @media (max-width:440px){
    width:100vw;
    height:100%;
    }
`;
export const Slides = styled.div`
  height: 100%;
  width: 200%;
  display: flex;
`;
export const SlidesInput = styled.div`
  display: none;
`;
export const Slide = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display:flex;
  justfy-content:center;
  align-itens:center;

  a{
    text-decoration:none;
    height:100%;
    width:100%;
  }
`;
export const ImgSliderFrente = styled.div`
  height: 100%;
  width: 100vw;
  display: flex;
  background-image: ${(props) => `url(${props.src})`};
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  justify-content: center;
  align-items: center;

  @media (max-width:440px){
    background-size: contain;

  }
`;

export const ManualNavigation = styled.div`
  position: absolute;
  bottom: 1.5rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;
export const ManualButton = styled.button`
  border: 2px solid white;
  padding: 5px;
  border-radius: 50%;
  background-color: transparent;
  cursor: pointer;
  transition: 0.5s;

  &:hover {
    background-color: #13df00ff;
  }
`;
export const AutoNavigation = styled.div`
  position: absolute;
  bottom: 1rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;
export const AutoButton = styled.div`
  border: 2px solid #ffffffff;
  padding: 5px;
  border-radius: 50%;
  background-color: transparent;
  cursor: pointer;
  transition: 0.5s;

  &:hover {
    background-color: white;
  }
`;
export const RadioInput = styled.input`
  display: none;
`;
export const FirstSlide = styled.div`
  margin-left: 0;
  transition: margin-left 0.5s;
`;
export const SecondSlide = styled.div`
  margin-left: -100%;
  transition: margin-left 0.5s;
`;