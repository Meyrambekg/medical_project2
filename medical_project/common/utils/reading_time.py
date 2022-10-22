from bs4 import BeautifulSoup
import datetime


def get_reading_time(body):
    soup = BeautifulSoup(body, 'html.parser')
    text = soup.get_text()
    word_count = len(text.split())
    read_time = word_count / 100
    if(read_time == 0):
        return None
    read_time = str(datetime.timedelta(minutes=read_time))
    return read_time