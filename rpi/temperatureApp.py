import requests
import os
import time

url = "http://xxx.xxx.x.xx/post"

def getCPUtemperature():
    res = os.popen('vcgencmd measure_temp').readline()
    return(res.replace("temp=","").replace("'C\n",""))
	
if __name__ == '__main__':
	while True:
		temperature = getCPUtemperature()
		print(temparature)
		r = requests.post(url, data={"temperature": temperature})
		time.sleep(5)
		
