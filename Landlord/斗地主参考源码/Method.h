#pragma once
#include "GameData.h"
#include <vector>
using namespace std;

struct CARDSTYLE
	{
	
	 int max;//���ֵ
	 int min;//��Сֵ
	 int m_value;//Ȩֵ
	 int m_ID;
	 bool m_ISprimary;//����֮��,trueΪ����,falseΪ���� 
	 CARDSTYLE()
		 {
		 m_ISprimary =false;
		 }
	};

struct ARRAYSENDCARD 
{
   int max;  //��ǰ���Ƶ����ֵ
   CARDTYPE type;//��ǰ���Ƶ�����
   int whoHost;//�Ƿ��ǵ���������
   bool isHost;
   int cardNum;
};
struct ZONGCARDS
	{
	vector <CARDSTYLE>  s_rocket;//���
	vector <CARDSTYLE>  s_bosb;//ը��
	vector <CARDSTYLE>  s_three;//3��
	vector <CARDSTYLE>  s_plane;//�ɻ�
	vector <CARDSTYLE>  s_link;//����
	vector <CARDSTYLE>  s_doubleLink;//˫˳
	vector <CARDSTYLE>  s_double;//����
	vector <CARDSTYLE>  s_single;//����
	
	 
	};
class CMethod
	{
	public:
		CMethod(void);
		void Shuffle(int * );//ϴ��
		 void SortCards(vector<SCARD>&);// �����Ƶķ���
		 void CheckImage( vector<IMAGEBUTTON>& ,const POINT &);//�ж�ͼƬ��ɫ��
		 int ClickImage(vector<IMAGEBUTTON>& ,const POINT &);//����ͼƬ
		 void CancelImage(vector<IMAGEBUTTON>& ,const POINT &);//ȡ��ͼƬ
		 void DeleteImage(vector<IMAGEBUTTON>&);//ɾ��ͼƬ
		 void ForceHost();//ǿ�Ƶ�����
         
		 void ClickCard(vector<SCARD>&,const POINT&);//������
         CARDTYPE SendCards(vector<SCARD>&,vector<SENDCARDS>&);//����
		 CARDTYPE JudgeCardsType(vector<SENDCARDS>&);//�ж�����(����:���Ƶ����飬���ֵ)
		 bool  JudeLink(int * temp);//�ж�3���Ƿ�����
        
		void ClassifyCards(vector<SCARD>&);//���ƽ��з���

		void JudeDoubleLink(vector<CARDSTYLE> &,vector<CARDSTYLE> &,bool);//�ж�����
		void JudeFly(vector<CARDSTYLE> &,vector<CARDSTYLE>&,bool);//�жϷɻ�
		void DeleteElement(vector<CARDSTYLE> &,vector<CARDSTYLE>& );//��һ����������ɾ��Ԫ��
		bool DeleteComputerCard(vector<SCARD>&,CARDTYPE,vector<SENDCARDS>& ,int,int ,int);//ɾ�����Ե���

		bool sendPlane(vector<SCARD>& player,vector<SENDCARDS>& send,int  ID,int x,int y);
		void JudeLink();//�ж�����
		void SplitCards();//����
		int GetCardNum();//�����Ƶ�����

		void RegainCard();//�ָ��ʼ����

		void ErgodicCard(bool ,bool ,bool ,bool ,bool );//��������

		bool PlayerSendCards(int ,int,bool,vector<SENDCARDS>&,vector<SCARD>& );//����2���м���û�г��ƣ���ǰ��˭�����ƣ��Ƿ��ڵ������¼�,��������,��ҳ���
		CARDTYPE SendStely();//���㵱ǰ���Ƶ�����

		
	public:
		~CMethod(void);
		ARRAYSENDCARD     m_sendArray;
		int     m_maxCard;//�Ƶ����ֵ
		int m_noSendNum;//2�Ҳ�Ҫ�ô���

	private:
		vector<IMAGEBUTTON> m_cardImage; //��ҵ����ʱ�Ľṹ�壬�����ж�
		int m_intArray[15];          //��¼ÿ���Ƴ��ֵĴ���3----���
		vector<SENDCARDS> m_send;//������ʱ����
		NUMBER  m_card;//���ţ����ӣ�3�ţ�4�ų��ֵĴ���
		int     m_maxValue[4];//��¼���ֵ
		int     m_arrayThree[6];//��¼3�ų��ֵ�shihou
		

		vector <CARDSTYLE>  m_rocket;//���
		vector <CARDSTYLE>  m_bomb;//ը��
		vector <CARDSTYLE>  m_three;//3��
		vector <CARDSTYLE>  m_plane;//�ɻ�
		vector <CARDSTYLE>  m_link;//����
		vector <CARDSTYLE>  m_doubleLink;//˫˳
		vector <CARDSTYLE>  m_double;//����
		vector <CARDSTYLE>  m_single;//����
	    vector<ZONGCARDS>   m_handNum;//�Ƶ�����

		
	};
