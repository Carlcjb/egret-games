@echo off
color 0A

echo                ===========Start===========

cls
echo.��������Ҫ�����oss��ַǰ׺
echo.��ΪĬ�ϣ�http://oss.aliyuncs.com/tapheroes/resource_Publish/��
echo.������ 0 ��������������
set /p uri=
echo.��������Ҫ���еĲ���1���� 2��1��׷�ӣ�2���ָ���
set /p process_type=

python replaceResUrl.py %uri% %process_type%

echo                ===========End===========
pause

