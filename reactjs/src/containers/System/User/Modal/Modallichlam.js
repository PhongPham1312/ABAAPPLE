import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { createLichlam , getLichlamNextWeek} from '../../../../services/lichlam';
import '../user.scss';
class ModalLichlam extends Component {

    constructor(props) {
        super(props);   
        this.state = {
             daysNextWeek: [] ,// mảng lưu danh sách ngày,
            name: this.props.userInfo.name,
            schedule: {} // lưu thông tin {`${ca}_${dayIndex}_${rowIndex}`: "Tên"}
        }
    }
    async componentDidMount () {
        this.generateNextWeekDays();
      /*   await this.getlichlam()        */ 
    }

    // get 
    getlichlam = async () => {
        let res = await getLichlamNextWeek();
        if (res && res.errCode === 0) {
            let scheduleDB = {};
            res.data.forEach(item => {
                const key = `${item.ca}_${item.ngay}_${0}`; // cần chỉnh mapping phù hợp
                scheduleDB[key] = item.user;
            });
            this.setState({ schedule: scheduleDB });
        }
    }

     generateNextWeekDays = () => {
        const thuVN = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
        let today = new Date();
        let dayOfWeek = today.getDay(); // CN = 0, T2 = 1...
        let nextMonday = new Date(today);
        nextMonday.setDate(today.getDate() + (8 - dayOfWeek)); // Tìm thứ 2 tuần tới

        let days = [];
        for (let i = 0; i < 7; i++) {
            let currentDate = new Date(nextMonday);
            currentDate.setDate(nextMonday.getDate() + i);
            let thuText = thuVN[currentDate.getDay()];
            let dateText = `${currentDate.getDate()}.${currentDate.getMonth() + 1}`;
            days.push(`${thuText} _ ${dateText}`);
        }
        this.setState({ daysNextWeek: days });
    }

    handleCellClick = async (ca, dayIndex, rowIndex) => {
        const { schedule, name, daysNextWeek } = this.state;
        const key = `${ca}_${dayIndex}_${rowIndex}`;

        // Đếm số ô đã chọn trong cùng 1 ca và cùng 1 ngày cho user này
        const selectedInDayCa = Object.keys(schedule).filter(k => {
            const [caKey, dayKey] = k.split("_"); // caKey = ca, dayKey = dayIndex
            return caKey === String(ca) && dayKey === String(dayIndex) && schedule[k] === name;
        }).length;

        if (schedule[key]) {
            // Nếu click lại ô đã chọn thì hủy chọn (có thể thêm API delete nếu cần)
            this.setState(prevState => {
                const newSchedule = { ...prevState.schedule };
                delete newSchedule[key];
                return { schedule: newSchedule };
            });
        } else {
            if (selectedInDayCa >= 1) {
                alert(`Trong ngày ${daysNextWeek[dayIndex]}, bạn chỉ được chọn 1 ô cho CA${ca}`);
                return;
            }

            const dayText = daysNextWeek[dayIndex];
            const isConfirm = window.confirm(
                `Bạn có chắc chắn muốn chọn CA${ca} - ${dayText}?`
            );
            if (!isConfirm) return;

            // Chuẩn bị dữ liệu để lưu DB
            const payload = {
                user: name,
                ngay: dayText,   // 👉 bạn nên đổi thành yyyy-mm-dd để DB query dễ
                ca: `CA${ca}`
            };

            let res = await createLichlam(payload);
            if (res && res.errCode === 0) {
                // lưu thành công → load lại lịch từ DB
                await this.getlichlam();
            } else {
                alert(res.errMessage || "Tạo lịch làm thất bại");
            }
        }
    };



    render() {
        const { daysNextWeek, schedule  } = this.state;
        return (
            <div className='ModalNhansu'>
                <div className='lichlam-container'>
                    <div className='header'>Lịch Làm</div>

                    {/* table */}
                    <table className="table table-bordered">
                    <thead>
                            <tr className='th-thu'>
                                <th scope="col">#</th>
                                {daysNextWeek.map((day, index) => (
                                    <th key={index} scope="col">{day}</th>
                                ))}
                            </tr>
                        </thead>
                    <tbody>
                            {[1, 2, 3, 4].map((ca) => (
                                <React.Fragment key={ca}>
                                    {[0, 1, 2].map((rowIndex) => (
                                        <tr key={rowIndex}>
                                            {rowIndex === 0 && (
                                                <th rowSpan="3">{`CA${ca}`}</th>
                                            )}
                                            {Array(7).fill("").map((_, dayIndex) => {
                                                const key = `${ca}_${dayIndex}_${rowIndex}`;
                                                return (
                                                    <td 
                                                        key={dayIndex} 
                                                        onClick={() => this.handleCellClick(ca, dayIndex, rowIndex)}
                                                        style={{ cursor: "pointer" , fontSize: '10px' }}
                                                    >
                                                        {schedule[key] || ""}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    ))}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ModalLichlam));
