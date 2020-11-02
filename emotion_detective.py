# 2020/10/31 TANAKA
# emotion detective from images
# https://www.pc-koubou.jp/magazine/27499

import cognitive_face as CF

KEY = '4490cc6285cd476881961a49cf6b2579'
BASE_URL = 'https://japaneast.api.cognitive.microsoft.com/face/v1.0'

CF.Key.set(KEY)
CF.BaseUrl.set(BASE_URL)

img_url = "test1.jpg"
faces = CF.face.detect(img_url, attributes='emotion')
#elementlist in faces[0]
# { faceId , faceRectangle { top , left , width , height } ,
#   faceAttributes{ emotion{ anger , contempt , disgust , fear , happiness , neutral , sadness , surprise } }



#print all elements of faces data from Face api
#print(faces) 


#get each value of emotion data
anger=faces[0]['faceAttributes']['emotion']['anger']
contempt=faces[0]['faceAttributes']['emotion']['contempt']
disgust=faces[0]['faceAttributes']['emotion']['disgust']
fear=faces[0]['faceAttributes']['emotion']['fear']
happiness=faces[0]['faceAttributes']['emotion']['happiness']
neutral=faces[0]['faceAttributes']['emotion']['neutral']
sadness=faces[0]['faceAttributes']['emotion']['sadness']
surprise=faces[0]['faceAttributes']['emotion']['surprise']

