const getFirstNValues = <T>(arr: T[], count: number): T[] => {
    return arr.slice(0, count);
};

export default getFirstNValues;
