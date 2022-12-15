import random
import time
from time import sleep
import requests

#############
# constants #
url = 'http://172.16.232.229:5001/api/metadata/create'
cooldown_loop_interval = 0.4  # seconds
random_range = 3.2
#############

########################
# simulation variables #
planes = {"Airbus12345": (162.9, 4018.2), "Airbus14346": (191.2, 3029.3)}
########################

def createAndPostData():
    for i in planes.keys():
        planes[i] = (planes[i][0] + random.uniform(-random_range, random_range), planes[i][1] + random.uniform(-random_range, random_range))
        print(requests.post(url, json={
            "timestamp": str(int(time.time())),
            "latitude": planes[i][0],
            "longitude": planes[i][1]
        }))

def run():
    while True:
        sleep(cooldown_loop_interval)
        createAndPostData()

if __name__ == '__main__':
    run()
