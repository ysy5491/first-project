from flask import Flask, redirect, request, render_template, session, url_for #render_template으로 html파일 렌더링
import pymysql, secrets


app = Flask(__name__)
app.secret_key = secrets.token_hex(16) #세션 암호화 이거 없으면 로그인 기능 x

db = pymysql.connect(host='127.0.0.1', user='root', password='5491', db='ysy', charset='utf8')
cursor = db.cursor()

@app.route('/')
def home():
    if 'loggedin' in session:
        return render_template('homeo.html') # 로그인 후 메인 페이지
    else:
        return render_template('home.html') # 로그인 전 메인 페이지 

@app.route('/inquiry')
def setting():
    return render_template('inquiry.html') # 문의사항 페이지

@app.route('/register', methods=['GET', 'POST']) # 정보 미입력 처리 예외사항 추가작성
def register():
    if 'loggedin' in session:
        return redirect(url_for('home'))

    if request.method == 'POST':
        id = request.form['id']
        username = request.form['username']
        password = request.form['password']
        email = request.form['email']

        cursor.execute('''SELECT * FROM user WHERE id = %s OR email = %s''', (id, email)) # 아이디나 이메일에 중복된 값 찾기 없으면 None
        overlap = cursor.fetchone()

        if not id or not password or not email or not username:
            return '모든 칸을 입력하세요.'
        elif overlap: #none이면 실행하지 않음 
            return '이메일이나 아이디가 이미 존재하는 값 입니다.'
        elif 'id' in request.form and'username' in request.form and 'password' in request.form and 'email' in request.form:
            insert_sql ='''INSERT INTO user (id, username, email, password) VALUES (%s, %s, %s, %s)'''
            cursor.execute(insert_sql, (id, username, email, password))
            db.commit() 
            return redirect(url_for('home'))
    

    # if request.method == 'post' and not id or not password or not email or not username:
    #     return '모두 칸을 입력하세요.'
    
    # if overlap > 0:

    # if request.method == 'POST' and 'username' in request.form and 'password' in request.form and 'email' in request.form:
    #     insert_sql ='''INSERT INTO user (id, username, email, password) VALUES (%s, %s, %s, %s)'''
    #     cursor.execute(insert_sql, (id, username, email, password))
    #     db.commit()
        
    #     return redirect(url_for('home'))

    return render_template('register.html') 

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST': #서버로 요청처리시 
        id = request.form['id']
        password = request.form['password']
        cursor = db.cursor()
        sql = '''SELECT * FROM user WHERE id = %s AND password = %s'''
        cursor.execute(sql, (id, password))
        user = cursor.fetchone()

        if not id or not password: #id나 비밀번호가 none
            return '아이디 또는 비밀번호를 모두 입력하세요.'
        
        if not user: #user가 none
            cursor.close()
            return '아이디 또는 비밀번호가 일치하지 않습니다.'

        session['loggedin'] = True # 세션에 로그인 되었다고 부울값 설정
        session['id'] = user[0] #로그인 성공 user 테이블을 튜플 형태로 반환 아이디는 첫번째 요소에 있기 때문에 0으로 하고 세션 id에 적용
        cursor.close()
        return redirect(url_for('home'))
    return render_template('login.html')
#회원정보 변경 alter 실행 완료시간이 너무 긴 문제가 발생
@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('home'))
@app.route('/mypage')
def mypage():
    return render_template('mypage.html') # 설정 페이지

if __name__ == "__main__":
   
    app.run(host='0.0.0.0', port=80) # 포트번호 80은 http를 의미 그래서 주소 뒤에 따로 포트를 지정하지 않아도 브라우저가 알아서 잡아줌, 0.0.0.0로 함으로써 모든 아이피를 가리키는 의미로 외부 접속 허용