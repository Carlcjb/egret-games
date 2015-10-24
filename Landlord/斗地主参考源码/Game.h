#pragma once
#include "GameData.h"
#include <vector>
using namespace  std;
#include "cards.h"
#include "Method.h"


class CGame :
	public CCards
	{
	public:
		CGame(void);
		void InitGameData();                                         //��Ϸ��ʼ��
		void GameStart();                                            //��Ϸ��ʼ
		void GameDraw(CDC *);                                         //��Ϸ�Ļ���
		
		int GetGameState(){ return m_gameState;}//�����Ϸ״̬
		int GetWhoCallHost(){return m_whoCallHost;}//��õ�ǰ˭�е���
		int GetWhoSendCard(){return m_whoSendCard;}//��õ�ǰ��˭����
		int getWhoIsHost(){return m_whoIsHost;} //���˭�ǵ���
		int GetIndex(){return m_imageIndex;}//���ͼƬ������
		bool GetShuffle(){return  m_isShuffle;}//��õ�ǰ�Ƿ�����ϴ��
		bool GetSendCard(){return  m_isSendCard;}//��õ�ǰ�Ƿ�����fapai
		int GetCardsNum(){return  m_cardNums;}//��õ�ǰ�Ƿ�����fapai
		float GetY(){return m_coor_y;}

        void SetShow();
		void  SetY(float  i){m_coor_y =i;} 
		void SetCardsNum(int i){ m_cardNums =i;}//����fapai
		void SetSendCard(bool is){ m_isSendCard =is;}//����fapai
		void SetShuffle(bool is){m_isShuffle =is;}//����ϴ��
		void SetIndex(int i){m_imageIndex =i;}//����ͼƬ����
		void SetGameState(int state){  m_gameState=state;}//������Ϸ״̬
		void SetWhoCallHost(int player){ m_whoCallHost=player;}//���õ�ǰ˭�е���
		void SetWhoSendCard(int whoSend){ m_whoSendCard=whoSend;}//���õ�ǰ��˭����
		void SetWhoIsHost(int player){m_whoIsHost=player;}
		void setPass(PASS p){m_pass =p;}
		void SetMessage(bool IS){m_isMessage =IS;}//�����ֶ�������Ϣ
		bool GetMessage(){return m_isMessage;}//�ж��Ƿ��ֶ�������Ϣ

		void calculateTwoPoint(float,float,float,float);//�����������߶�
	private:
        void LoadImage();           //����ͼƬ
		void DrawPlayer(vector<SCARD> &);//�������
		void DrawHost();//���Ƶ���
		void DrawImageButton();//���ư�ťͼƬ
		void DrawSendCard();//���Ƴ�����
		void DrawPass();//���Ʋ���


		int m_cardNums;
	    int  m_imageIndex;       //ͼƬ����
		int  m_gameState;       //��Ϸ״̬(���ƣ��е�������ʼ��Ϸ����Ϸ����)
		int  m_whoCallHost;     //˭�е���
		int m_whoSendCard;      //˭����
		int m_whoIsHost;       //˭�ǵ���;

		bool m_isMessage;  //�Ƿ��ֶ�������Ϣ
		bool m_isShuffle;// �ж��Ƿ�����ϴ��
		bool m_isSendCard;
		PASS m_pass;//pass
		/* DC*/
		CMethod m_meth;
		HBITMAP m_bit[30];         //��ͼ����
		CDC m_dcBuffer;//˫���屳��DC
		CDC m_dcImage;//��DC
		CDC m_dcMask;//����ͼDC
		SCARD m_card[54]; //54��ͼƬ
     public:	


         SCARD  m_intArray[54];
		
		 float m_k;/*y=kx+b;*/
		 float m_b;
		 float m_coor_y;


		vector<SCARD> m_playA;      //���A
		vector<SCARD> m_playB;      //���B
		vector<SCARD> m_playC;     //���C
		vector<SCARD> m_dizhu;     //����
		vector<SENDCARDS> m_sendCard;
		vector<IMAGEBUTTON> m_imageButton; //ͼƬ��ťͼƬ����

		

		//vector<IMAGEBUTTON> m_cardImageButton;//����Ƶ����飬�����ж��û�����
		

	






		~CGame(void);
	};
