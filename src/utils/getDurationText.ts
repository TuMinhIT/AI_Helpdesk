export const getDurationText = (duration: number) => {
    if (duration > 36000) return "/năm";
    if (duration === 30) return "/tháng";
    return `/${duration} ngày`;
};
