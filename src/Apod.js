import 'whatwg-fetch';
import React, { Component } from 'react';
import styled from 'styled-components';

const NasaComponent = styled.section`
  font-family: Verdana, Helvetica, Tahoma, sans-serif;
  font-size: 16px;
`;

const Title = styled.h1`
  border-top: 7px solid #3671d2;
  font-size: 1.75em;
  text-align: center;
  background-color: #384fa5;
  background-color: #013d7d;
  color: #fffdf4;
  margin-top: 0;
  padding-top: .5em;
  padding-bottom: .5em;
  margin-bottom: 0;
`;

const Text = styled.p`
  color: #04336c;
  line-height: 1.5;
`;

const Slider = styled.input`
  margin-left: 1em;
  margin-right: 1em;
`;

const Label = styled.label`
  color: #04336c;
  vertical-align: top;
`;

const Output = styled.output`
  color: #04336c;
  display: block;
  font-size: 1.2em;
  padding-top: .5em;
  padding-bottom: 1em;
`;

const Button = styled.button`
  appearance: none;
  background-color: #04336c;
  border-radius: 4px;
  border: none;
  color: #fff;
  cursor: pointer;
  display: block;
  font-size: 1em;
  font-weight: 600;
  line-height: 1;
  padding: .8em 1em;
  text-decoration: none;
  user-select: none;
  vertical-align: middle;
  white-space: nowrap;
  margin-left: auto;
  margin-right: auto;
`;

const ImageContainer = styled.div`
  background-color: black;
`;

const Image = styled.img`
  border-left: 1px solid white;
  border-right: 1px solid white;
  box-sizing: border-box;
  display: block; 
  height: auto;
  margin-left: auto;
  margin-right: auto;
  max-width: 100%;
  vertical-align: middle;
`;

const Copyright = styled.small`
  color: #9a9a9a;
  display:  block;
  padding-top: .5em;
  text-align: right;
`;

const Main = styled.div`
  color: #04336c;
  max-width: 60em;
  padding-left: 2em;
  padding-right: 2em;
  margin-left: auto;
  margin-right: auto;
`;

const Form = styled.div`
  border-bottom: 2px solid rgba(56, 79, 165, 0.5);
  border-top: 2px solid rgba(56, 79, 165, 0.5);
  padding-bottom: 1.5em;
  text-align: center;
  margin-top: 1.5em;
  margin-bottom: 2em;
`;

export default class Apod extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nasaModel: [],
      value: '',
      disabled: true,
      isHD: false,
      width: 'auto'
    };

   this.handleChange = this.handleChange.bind(this);
   this.checkSwapImage = this.checkSwapImage.bind(this);
  }

  componentDidMount() {
    fetch('https://api.nasa.gov/planetary/apod?api_key=aTnI7tvcnANazW7uwVSdLYR6U8IQhYWzTqsyJzgl')
    .then(response => {
      return response.json()
    })
    .then((json) => {
        const nasaModel = json;
        this.setState({ nasaModel });
    })
    .catch(function(ex) {
      console.log('parsing failed', ex)
    })
  }

  handleChange(event) {
    this.setState({
      value: event.target.value,
      disabled: false
    });
  }

  checkSwapImage() {
    this.setState({width: this.state.value});
   (this.state.value > 1000)? this.setState({isHD: true}) : this.setState({isHD: false});
  }

  componentWillMount() {
    document.body.style.margin = "0";
  }

  render() {
    const data = this.state.nasaModel;
    const isHD = this.state.isHD;

    return <NasaComponent>
        <Title>{data.title}</Title>
        <ImageContainer>
          <Image src={isHD ? data.hdurl : data.url} alt={data.title} style={{width: this.state.width + "px"}}/>
          {data.copyright && <Copyright>{data.copyright}</Copyright>}
          </ImageContainer>
        <Main>
          <Text>{data.explanation}</Text>
          <Form>
            <Text><b>You may change the size of the image by specifying a new width in pixels</b></Text>
            <Label>100px</Label>
            <Slider id="imageSize" type="range" min="100" max="2000" step="10" value={this.state.value} onChange={this.handleChange}></Slider>
            <Label>2000px</Label>
            <Output htmlFor="imageSize">{this.state.value}</Output>
            <Button id="changeImage" type="button" onClick={this.checkSwapImage} disabled={this.state.disabled}>Change image size</Button>
          </Form>
        </Main>
      </NasaComponent>;
  }

}
