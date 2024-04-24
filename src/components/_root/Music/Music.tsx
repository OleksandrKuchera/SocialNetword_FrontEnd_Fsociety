import style from './style.module.scss'
import { Search, PauseCircle, PlayCircle, SkipNext, SkipPrevious, VolumeUp } from '@mui/icons-material';
import albumPhoto from '../../../assets/artworks-000074397388-tx10b9-t240x240.jpg';

const Music = () => {
    return (
        <div className='d-flex justify-content-center'>
            <div className={style.page__layout}>
                <div className={style.page__container}>
                    <div className='d-flex justify-content-center'>
                        <div className={style.search__layout}>
                            <div className={style.search__container}>
                                <div className={style.search__icon}>
                                    <Search/>
                                </div>
                                <input className={style.search__bar} placeholder="Search"/>
                            </div>
                        </div>
                    </div>
                    <div className={style.songList}>
                        <div className={style.songList__title}>
                            <h1>Popular now</h1>
                        </div>
                        <div>
                            <div className={style.songList__song}>
                                <div className={style.songList__song__number}>1</div>
                                <div className={style.songList__song__img}>
                                    <img src={albumPhoto} alt="Song logo" />
                                </div>
                                <div className={style.songList__song__info}>
                                    <div className={style.songList__song__info__name}>
                                        <h1>Song name</h1>
                                        <h2>Author</h2>
                                    </div>
                                    <h1>3:30</h1>
                                </div>
                            </div>
                            <div className={style.songList__song}>
                                <div className={style.songList__song__number}>2</div>
                                <div className={style.songList__song__img}>
                                    <img src={albumPhoto} alt="Song logo" />
                                </div>
                                <div className={style.songList__song__info}>
                                    <div className={style.songList__song__info__name}>
                                        <h1>Song name</h1>
                                        <h2>Author</h2>
                                    </div>
                                    <h1>3:30</h1>
                                </div>
                            </div>
                            <div className={style.songList__song}>
                                <div className={style.songList__song__number}>3</div>
                                <div className={style.songList__song__img}>
                                    <img src={albumPhoto} alt="Song logo" />
                                </div>
                                <div className={style.songList__song__info}>
                                    <div className={style.songList__song__info__name}>
                                        <h1>Song name</h1>
                                        <h2>Author</h2>
                                    </div>
                                    <h1>3:30</h1>
                                </div>
                            </div>
                            <div className={style.songList__song}>
                                <div className={style.songList__song__number}>4</div>
                                <div className={style.songList__song__img}>
                                    <img src={albumPhoto} alt="Song logo" />
                                </div>
                                <div className={style.songList__song__info}>
                                    <div className={style.songList__song__info__name}>
                                        <h1>Song name</h1>
                                        <h2>Author</h2>
                                    </div>
                                    <h1>3:30</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={style.player__layout}>
                        <div className={style.player__activeSong}>
                            <div className={style.player__activeSong__img}>
                                <img src={albumPhoto} alt="Song logo" />
                            </div>
                            <div className={style.player__activeSong__info}>
                                <h3>Now playing:</h3>
                                <h1>Гондурас</h1>
                                <h2>Злий Репер Зеник</h2>
                                <h4>3:30</h4>
                            </div>
                        </div>
                        <div className={style.player__controls__layout}>
                            <div className={style.player__controls__container}>
                                <div className={style.player__controls__buttons}>
                                    <SkipPrevious className={style.player__controls__icon}/>
                                    <PauseCircle className={style.player__controls__icon}/>
                                    {/* <PlayCircle className={style.player__controls__icon}/> */}
                                    <SkipNext className={style.player__controls__icon}/>
                                </div>
                                <div className={style.player__controls__time}>
                                    <progress className={style.bar__time} id="time" value="32" max="100"></progress>
                                    <div className={style.player__controls__time__timecode}>
                                        <h2>1:07</h2>
                                        <h2>3:30</h2>
                                    </div>
                                </div>
                                <div className={style.player__controls__volume}>
                                    <div className={style.player__controls__volume__iconContainer}>
                                        <VolumeUp className={style.player__controls__icon}/>
                                    </div>
                                    <div className={style.player__controls__volume__barContainer}>
                                        <progress className={style.bar__volume} id="time" value="76" max="100"></progress>
                                        <h2>76%</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Music;