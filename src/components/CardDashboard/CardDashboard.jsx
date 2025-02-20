import React from 'react';

const CardDashboard = ({ data }) => {
    return (
        <div className="overview-card d-flex align-items-center gap-3">
            <div className="icon-size" style={{ background: data?.iconBg }}>
                <span
                    style={{
                        fontSize: '24px',
                        color: data.iconColor,
                    }}
                >
                    {data.icon}
                </span>
            </div>
            <div>
                <h3 className="m-0 card-titles">
                    {data?.count ? data?.count : 0}
                </h3>
                <p className="mb-0 card-desc">
                    {data?.name ? data?.name : 'N/A'}
                </p>
            </div>
        </div>
    );
};

export default CardDashboard;
