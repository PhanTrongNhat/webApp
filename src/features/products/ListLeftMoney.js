import Slider from '@material-ui/core/Slider';
import {ChangeMoney} from '../helpers/index';

function ListLeftMoney({value, rangeSelector, hanldeMoney}) {
    return (
        <>
        <div className="shop-one">
            <h3 className="wg-title2">Chọn giá</h3>
            <div className="widget shop-filter">
                <div className="info_widget">
                    <div className="price_filter">
                        <div className="wrapper_price">
                            <Slider
                                step={1000}
                                min={10000}
                                max={999999}
                                value={value}
                                onChange={rangeSelector}
                                valueLabelDisplay="auto"
                            />
                        </div>
                        <div id="amount">
                            <input value={ChangeMoney(value[0])} type="text" name="first_price" className="first_price" />
                            <input value={ChangeMoney(value[1])} type="text" name="last_price" className="last_price" />
                            <button onClick={hanldeMoney} className="button-shop" type="submit">Lọc giá</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default ListLeftMoney;