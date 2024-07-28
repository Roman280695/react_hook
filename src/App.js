import { useState, useEffect, useCallback, useMemo } from 'react';
import { Container } from 'react-bootstrap';


import './App.css';



// class Slider extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             autoplay: false,
//             slide: 0
//         }
//     }


//     componentDidMount() {
//         document.title = `Slide: ${this.state.slide}`;
//     }

//     componentDidUpdate() {
//         document.title = `Slide: ${this.state.slide}`;
//     }

//     changeSlide = (i) => {
//         this.setState(({slide}) => ({
//             slide: slide + i
//         }))
//     }

//     toggleAutoplay = () => {
//         this.setState(({autoplay}) => ({
//             autoplay: !autoplay
//         }))
//     }

//     render() {
//         return (
//             <Container>
//                 <div className="slider w-50 m-auto">
//                     <img className="d-block w-100" src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg" alt="slide" />
//                     <div className="text-center mt-5">Active slide {this.state.slide} <br/> {this.state.autoplay ? 'auto' : null}</div>
//                     <div className="buttons mt-3">
//                         <button 
//                             className="btn btn-primary me-2"
//                             onClick={() => this.changeSlide(-1)}>-1</button>
//                         <button 
//                             className="btn btn-primary me-2"
//                             onClick={() => this.changeSlide(1)}>+1</button>
//                         <button 
//                             className="btn btn-primary me-2"
//                             onClick={this.toggleAutoplay}>toggle autoplay</button>
//                     </div>
//                 </div>
//             </Container>
//         )
//     }
// }


const countTotal = (num) => {
    console.log('counting...');
    return num + 10;
}

const calcValue = () => {
    console.log('randoom');

    return Math.floor((Math.random() * (50 - 1) + 1));
}


const Slider = (props) => {


    //  slide - начальное состояние 
    // setSlide - функция которая меняет это состояние
    // 0 - начальное значение состояния
    const [slide, setSlide] = useState(calcValue);
    const [autoplay, setAutoplay] = useState(false);


    // useEffect - принимает в себя колбэк функцию,
    // которая будет вызываться, когда компонент отрендерился
    // т.е. когда построено дом дерево и дальше эта
    // функция будет вызываться каждый раз когда этот
    // компонент будет обновляться (изменение стейта, изменение пропсоф, либо форсе апдейт)
    // Когда идет перерендеринг компонента у нас, у нас
    // вызываются все внутренности этой функции - useEffect
    // как сделать так чтобы функция не вызывалась каждый раз
    // при рендеринге, а только вызывалась в зависимости от состояния за
    // которым она следит? - Для этого ВТОРЫМ аргументом предаем массив зависимостей,
    // если ни одна из этих зависмостей не изменилась, то эффект
    // у насс будет пропущен

    function loggin() {
        console.log('logg!!');
    }

    useEffect(() => {

        console.log('effect');
        document.title = `Slide: ${slide}`;

        window.addEventListener('click', loggin);

        return () => {
            window.removeEventListener('click', loggin);
        }


    }, [slide]);

    useEffect(() => {
        console.log('autoplay');
    }, [autoplay]);

    


    // для того чтобы функция вызывалась один раз 
    // по надобности нужен хук useCallback
    // первым аргуиентом бует функция 
    // вторым аргументом идет массив зависимостей

    const getSomeImage = useCallback(() => {
        console.log('fetching');

        return [
            "https://rostec.ru/upload/iblock/046/u3h8gel1sbbzipdzizecz9oqekhs6hg5.jpeg",
            "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/6b2c8d03-75df-4ef0-9ad4-4f607483a980/denw7j5-7269ccf0-322f-492d-8e63-5b05f1f165fc.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzZiMmM4ZDAzLTc1ZGYtNGVmMC05YWQ0LTRmNjA3NDgzYTk4MFwvZGVudzdqNS03MjY5Y2NmMC0zMjJmLTQ5MmQtOGU2My01YjA1ZjFmMTY1ZmMuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.H2uRDHNoBE4roDd-AKdRK5hJ4Mc2nNVR6uCSbsnF3n0"
        ]


    }, [slide]);




    function changeSlide(i) {
        setSlide(slide => slide + i);
    }

    function toggleAutoplay() {
        setAutoplay(autoplay => !autoplay);
    }



    const total = useMemo(() => {
        return countTotal(slide);
    }, [slide]);

    const style = useMemo(() => ({
        color: slide > 4 ? 'red' : 'black'
    }), [slide]);

    useEffect(() => {
        console.log('styles!');
    }, [style]);


    return (
        <Container>
            <div className="slider w-50 m-auto">
                {/* {
                    getSomeImage().map((url, i) => {
                        return (
                            <img key={i} className="d-block w-100" src={url} alt="slide" />
                        )
                    })
                } */}

                <Slide getSomeImage={getSomeImage} />


                <div className="text-center mt-5">Active slide {slide} <br />
                    {autoplay ? 'auto' : null}    </div>
                <div style={style} className="text-center mt-5">Total slides: {total}</div>
                <div className="buttons mt-3">
                    <button
                        className="btn btn-primary me-2"
                        onClick={() => changeSlide(-1)}>-1</button>
                    <button
                        className="btn btn-primary me-2"
                        onClick={() => changeSlide(1)}>+1</button>
                    <button
                        className="btn btn-primary me-2"
                        onClick={toggleAutoplay}>toggle autoplay</button>
                </div>
            </div>
        </Container>
    )
}


const Slide = ({ getSomeImage }) => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        setImages(getSomeImage())
    }, [getSomeImage])

    return (
        <>
            {images.map((url, i) => {
                return (
                    <img key={i} className="d-block w-100" src={url} alt="slide" />
                )
            })}
        </>
    )
}


function App() {

    const [slide, setSlide] = useState(true);


    return (
        <>
            <button onClick={() => setSlide(false)}>Click</button>
            {slide ? <Slider /> : null}

        </>


    );
}

export default App;
