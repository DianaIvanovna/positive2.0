export const sortTour = data => {
    if (!data) {
        return [];
    }

    let dates;
    let minCost;

    // TODO: добавить удаление прошедших поездок
    data.forEach(tour => {
        dates = [];
        minCost = null;
        tour.trips.forEach(trip => {
            if (minCost === null || minCost > +trip.cost) {
                minCost = +trip.cost;
            }

            dates.push({
                dateStart: trip.dateStart,
                dateEnd: trip.dateEnd,
            });
        });
        tour.minCost = minCost;
        tour.dates = dates;
    });

    return data;
};
