const data = [];

class PlaysService {
    save(play) {
        data.push(play);

        return play;
    }
}

export default new PlaysService();
